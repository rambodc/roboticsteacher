<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <form
      id="kt_login_signin_form"
      class="form w-100"
      @submit="onSubmitLogin"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">
          Sign In
        </h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          New Here?

          <router-link to="/signup" class="link-primary fw-bold">
            Create an Account
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">Email</label>
        <!--end::Label-->

        <!--begin::Input-->
        <input
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="email"
          autocomplete="off"
        >
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">Password</label>
          <!--end::Label-->

          <!--begin::Link-->
          <router-link to="/password-reset" class="link-primary fs-6 fw-bold">
            Forgot Password ?
          </router-link>
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <input
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        >
        <!--end::Input-->
      </div>
      <!--end::Input group-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">

export default {
  name: 'SignIn',
  layout: 'AuthLayout',
  methods: {
    onSubmitLogin () {}
  }
  // setup() {
  //     const store = useStore();
  //     const router = useRouter();

  //     const submitButton = ref<HTMLButtonElement | null>(null);

  //     //Create form validation object
  //     const login = Yup.object().shape({
  //     email: Yup.string().email().required().label("Email"),
  //     password: Yup.string().min(4).required().label("Password"),
  //     });

  //     //Form submit function
  //     const onSubmitLogin = async (values) => {
  //     // Clear existing errors
  //     store.dispatch(Actions.LOGOUT);

  //     if (submitButton.value) {
  //         // eslint-disable-next-line
  //         submitButton.value!.disabled = true;
  //         // Activate indicator
  //         submitButton.value.setAttribute("data-kt-indicator", "on");
  //     }

  //     // Send login request
  //     await store.dispatch(Actions.LOGIN, values);
  //     const [errorName] = Object.keys(store.getters.getErrors);
  //     const error = store.getters.getErrors[errorName];

  //     if (!error) {
  //         Swal.fire({
  //         text: "You have successfully logged in!",
  //         icon: "success",
  //         buttonsStyling: false,
  //         confirmButtonText: "Ok, got it!",
  //         customClass: {
  //             confirmButton: "btn fw-semobold btn-light-primary",
  //         },
  //         }).then(function () {
  //         // Go to page after successfully login
  //         router.push({ name: "dashboard" });
  //         });
  //     } else {
  //         Swal.fire({
  //         text: error[0],
  //         icon: "error",
  //         buttonsStyling: false,
  //         confirmButtonText: "Try again!",
  //         customClass: {
  //             confirmButton: "btn fw-semobold btn-light-danger",
  //         },
  //         });
  //     }

  //     //Deactivate indicator
  //     submitButton.value?.removeAttribute("data-kt-indicator");
  //     // eslint-disable-next-line
  //         submitButton.value!.disabled = false;
  //     }
  // },
}
</script>
