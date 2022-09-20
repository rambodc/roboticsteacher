import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import express, {Express, Request, Response} from "express";
import {body, validationResult} from "express-validator";
import helmet from "helmet";
import cors from "cors";
import {UserRecord} from "firebase-functions/v1/auth";
import {Fields, Files} from "formidable";
import {createHash} from "crypto";
import {createReadStream} from "fs";
import MailService from "@sendgrid/mail";
import { UidRequest } from "./types";

const formidable = require("formidable-serverless");

/** Client Auth
 * This is a hack used to send a verification email using the auth cliend sdk.
 */
 import {
  signInWithCustomToken,
  sendEmailVerification,
  getAuth,
  signOut,
} from "@firebase/auth";
import {initializeApp} from "@firebase/app";
/** */

const NAME_LIMIT = {
  min: 0,
  max: 50
};
const PASSWORD = {
  minLength: 8,
  minUppercase: 1,
  minNumbers: 1
}
const ARRAY = {
  min: 1,
  max: 20
}
const EMAIL_BODY = {
  min: 1,
  max: 3000
}
const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
];

admin.initializeApp();

const app: Express = express();
MailService.setApiKey(
  process.env.SENGRID_API_KEY as string
)

app.use(cors({origin: true}));
app.use(helmet());
app.use(express.json());

const authMiddleware = async (req: Request, res: Response, next: any) => {
  const { headers } = req;
  
  if (headers.authorization && headers.authorization.includes('Bearer ')) {
    const token = headers.authorization.split(' ')[1]

    try {
      const user = (await admin.auth().verifyIdToken(token, true))
      if (user.email_verified) {
        (req as UidRequest).uid = user.uid
        next()
      } else {
        throw new Error("Unverified email")
      }
    } catch (e) {
      console.log(e)
      res.sendStatus(403)
    }
    
  } else {
    res.sendStatus(400)
  }
}

app.post("/signup",
  body("firstName").isString().isLength(NAME_LIMIT),
  body("lastName").isString().isLength(NAME_LIMIT),
  body("email").isEmail(),
  body("password").isStrongPassword(PASSWORD),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.sendStatus(400)
    }

    const auth = admin.auth();

    const displayName = `${req.body.lastName.split(' ')[0]} ${req.body.firstName.split(' ')[0]}`

    let user: UserRecord;
    try {
      user = await auth.createUser({
        email: req.body.email,
        password: req.body.password,
        displayName,
      });
    } catch (e) {
      console.log(e);
      return res.sendStatus(400);
    }

    const userDoc = admin.firestore().doc(`/users/${user.uid}`)
    try {
      userDoc.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        displayName,
        picture: "",
        createdTimeStamp: Date.now(),
        classRooms: []
      })
    } catch (e) {
      console.log(e)
      return res.sendStatus(500)
    }

    await auth.setCustomUserClaims(user.uid, {teacher: true})    

    const clientAuth = getAuth(initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    }));
    const customToken = await auth.createCustomToken(user.uid);
    const client = await signInWithCustomToken(clientAuth, customToken);
    await sendEmailVerification(client.user);
    await signOut(clientAuth);

    return res.sendStatus(200);
  }
)

app.post("/updatePicture",
  authMiddleware,
  async (req: Request, res: Response) => {
    const form = formidable({
      multiples: false,
      maxFields: 4,
    });
    await new Promise<void>(() =>
      form.parse(req, async (e: any, fields: Fields, files: Files) => {
        if (e) {
          console.log("error", e);
          return res.sendStatus(404);
        }

        let filename = ''
        let baseUrl = ''
        let deleteFile = async () => {
          true;
        };
        if (files && files.asset) {
          const file = files.asset as any;
          if (!allowedMimeTypes.includes(file.type)) {
            return res.send(400).json({
              reason: `Mimetype not ${file.type} supported`,
            });
          }

          const hash = createHash("sha256");
          hash.setEncoding("hex");

          try {
            await new Promise<void>((resolve) => {
              const fileStream = createReadStream(file.path);
              fileStream.on("end", function() {
                hash.end();
                hash.read();
              });
              fileStream.on("close", resolve);
              fileStream.pipe(hash);
            });
          } catch (e) {
            console.log(e);
            return res.sendStatus(500);
          }

          filename =
            `${hash.digest("hex").slice(0, 28)}.${file.name.split(".")[1]}`;

          const bucket = admin.storage().bucket();

          const fileBucket = bucket.file(`pictures/${filename}`);
          if ((await fileBucket.exists())[0]) {
            return res.status(400).json({
              reason: `File ${filename} exists in storage.`,
            });
          }

          const [File] = await bucket.upload(file.path, {
            destination: `pictures/${filename}`,
            metadata: {
              metadata: {
                name: file.name,
                type: file.type,
              },
            },
          });
          baseUrl = File.baseUrl ?? '' 
          deleteFile = async () => {
            File.delete();
          };
        }

        const userDoc = admin.firestore().doc(`/users/${(req as UidRequest).uid}`)
        try {
          userDoc.update({
            picture: filename
          })
          return res.status(200).send({
            url: baseUrl
          })
        } catch (e) {
          await deleteFile()
          console.log(e)
          return res.sendStatus(500)
        }
      })
    )
})

app.post("/invite",
  authMiddleware,
  body("to").isEmail(),
  body("fromName").isString().isLength(NAME_LIMIT),
  body("firstName").isString().isLength(NAME_LIMIT),
  body("lastName").isString().isLength(NAME_LIMIT),
  body("again").default(false).isBoolean(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.sendStatus(400)
    }

    //TODO add the invite email template and data
    const message = {
      to: req.body.to,
      from: {
        email: process.env.EMAIL as string,
        name: req.body.fromName
      },
      subject: req.body.subject,
      html: '',
      mailSettings: {
        bypassListManagement: {
          enable: false
        },
        footer: {
          enable: false
        },
        sandboxMode: {
          enable: false
        }
      },
      trackingSettings: {
        clickTracking: {
          enable: true,
          enableText: false
        },
        openTracking: {
          enable: true,
          substitutionTag: '%open-track%'
        },
        subscriptionTracking: {
          enable: false
        }
      }
    };

    try {
      await MailService.send(message)
    } catch (e) {
      console.log(e)
      return res.sendStatus(500)
    }

    if (req.body.again) {
      const q = await admin.firestore().collection("students")
                      .where("teacher", "==", (req as UidRequest).uid)
                      .where("email", "==", req.body.to)
                      .get()
      if (q.empty) {
        return res.sendStatus(400)
      } else {
        try {
          await q.docs[0].ref.update({
            nInvites: q.docs[0].data()?.nInvites + 1 ?? 2
          })
          return res.sendStatus(200)
        } catch (e) {
          console.log(e)
          return res.sendStatus(500)
        }
      }
    } else {
      const studentColl = admin.firestore().collection("students");
      try {
        const student = await studentColl.add({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          status: 'sended',
          nInvites: 1,
          createdAt: Date.now(),
          teacher: (req as UidRequest).uid
        })
        return res.status(200).json({
          ...(await student.get()).data,
          id: student.id
        })
      } catch (e) {
        console.log(e)
        return res.sendStatus(500)
      }
    }

})

app.post("/sendEmail",
  authMiddleware,
  body("to").isArray(ARRAY),
  body("fromName").isString().isLength(NAME_LIMIT),
  body("subject").isString().isLength(NAME_LIMIT),
  body("emailBody").isString().isLength(EMAIL_BODY),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.sendStatus(400)
    }

    //TODO add the invite email template and data
    const message = {
      to: req.body.to,
      from: {
        email: process.env.EMAIL as string,
        name: req.body.fromName
      },
      subject: req.body.subject,
      // html:
      text: req.body.emailBody,
      mailSettings: {
        bypassListManagement: {
          enable: false
        },
        footer: {
          enable: false
        },
        sandboxMode: {
          enable: false
        }
      },
      trackingSettings: {
        clickTracking: {
          enable: true,
          enableText: false
        },
        openTracking: {
          enable: true,
          substitutionTag: '%open-track%'
        },
        subscriptionTracking: {
          enable: false
        }
      }
    };

    try {
      await MailService.send(message)
      return res.sendStatus(200)
    } catch (e) {
      console.log(e)
      return res.sendStatus(500)
    }
})

/** Redirect to link */
app.get("/link/:linkId")

app.use((req: Request, res: Response, next: any) => {
  return res.status(404).json({
    error: 'Not Found'
  })
})

export const api = functions
    .https.onRequest(app);