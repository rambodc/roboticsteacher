<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <form
      id="kt_login_signup_form"
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitRegister"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">
          Create an Account
        </h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Already have an account?

          <router-link to="/signin" class="link-primary fw-bold">
            Sign in here
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      <!--begin::Input group-->
      <div class="row fv-row mb-7">
        <!--begin::Col-->
        <div class="col-xl-6">
          <label class="form-label fw-bold text-dark fs-6">First Name</label>
          <input
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="first_name"
            autocomplete="off"
          >
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6">
          <label class="form-label fw-bold text-dark fs-6">Last Name</label>
          <input
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="last_name"
            autocomplete="off"
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bold text-dark fs-6">Email</label>
        <input
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
        >
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6"> Password </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <input
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="password"
              autocomplete="off"
            >
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            />
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            />
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            />
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            />
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-dark fs-6">
          Confirm Password
        </label>
        <input
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="password_confirmation"
          autocomplete="off"
        >
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-check form-check-custom form-check-solid">
          <input
            class="form-check-input"
            type="checkbox"
            name="toc"
            value="1"
          >
          <span class="form-check-label fw-semobold text-gray-700 fs-6">
            I Agree &
            <a href="#" class="ms-1 link-primary">Terms and conditions</a>.
          </span>
        </label>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            />
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">

export default {
  name: 'SingUp',
  layout: 'AuthLayout',
  methods: {
    onSubmitRegister () {}
  }
  // setup() {
  //   const store = useStore();
  //   const router = useRouter();

  //   const submitButton = ref<HTMLButtonElement | null>(null);

  //   const registration = Yup.object().shape({
  //     first_name: Yup.string().required().label("Name"),
  //     last_name: Yup.string().required().label("Surname"),
  //     email: Yup.string().min(4).required().email().label("Email"),
  //     password: Yup.string().required().label("Password"),
  //     password_confirmation: Yup.string()
  //       .required()
  //       .oneOf([Yup.ref("password"), null], "Passwords must match")
  //       .label("Password Confirmation"),
  //   });

  //   onMounted(() => {
  //     nextTick(() => {
  //       PasswordMeterComponent.bootstrap();
  //     });
  //   });

  //   const onSubmitRegister = async (values) => {
  //     // Clear existing errors
  //     store.dispatch(Actions.LOGOUT);

  //     // eslint-disable-next-line
  //     submitButton.value!.disabled = true;

  //     // Activate indicator
  //     submitButton.value?.setAttribute("data-kt-indicator", "on");

  //     // Send login request
  //     await store.dispatch(Actions.REGISTER, values);

  //     const [errorName] = Object.keys(store.getters.getErrors);
  //     const error = store.getters.getErrors[errorName];

  //     if (!error) {
  //       Swal.fire({
  //         text: "You have successfully logged in!",
  //         icon: "success",
  //         buttonsStyling: false,
  //         confirmButtonText: "Ok, got it!",
  //         customClass: {
  //           confirmButton: "btn fw-semobold btn-light-primary",
  //         },
  //       }).then(function () {
  //         // Go to page after successfully login
  //         router.push({ name: "dashboard" });
  //       });
  //     } else {
  //       Swal.fire({
  //         text: error[0],
  //         icon: "error",
  //         buttonsStyling: false,
  //         confirmButtonText: "Try again!",
  //         customClass: {
  //           confirmButton: "btn fw-semobold btn-light-danger",
  //         },
  //       });
  //     }

  //     submitButton.value?.removeAttribute("data-kt-indicator");
  //     // eslint-disable-next-line
  //     submitButton.value!.disabled = false;
  //   };

  //   return {
  //     registration,
  //     onSubmitRegister,
  //     submitButton,
  //   };
  // },
}
</script>
