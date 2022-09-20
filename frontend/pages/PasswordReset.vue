<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <form
      id="kt_login_password_reset_form"
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitForgotPassword"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">
          Forgot Password ?
        </h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Enter your email to reset your password.
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6">Email</label>
        <input
          class="form-control form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
        >
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          id="kt_password_reset_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary fw-bold me-4"
        >
          <span class="indicator-label"> Submit </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            />
          </span>
        </button>

        <router-link
          to="/signup"
          class="btn btn-lg btn-light-primary fw-bold"
        >
          Cancel
        </router-link>
      </div>
      <!--end::Actions-->
    </form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">

export default {
  name: 'PasswordReset',
  layout: 'AuthLayout',
  methods: {
    onSubmitForgotPassword () {}
  }
  // setup() {
  //   const store = useStore();

  //   const submitButton = ref<HTMLButtonElement | null>(null);

  //   //Create form validation object
  //   const forgotPassword = Yup.object().shape({
  //     email: Yup.string().email().required().label("Email"),
  //   });

  //   //Form submit function
  //   const onSubmitForgotPassword = async (values) => {
  //     // eslint-disable-next-line
  //     submitButton.value!.disabled = true;
  //     // Activate loading indicator
  //     submitButton.value?.setAttribute("data-kt-indicator", "on");

  //     // dummy delay
  //     // Send login request
  //     await store.dispatch(Actions.FORGOT_PASSWORD, values);

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
  //       submitButton.value!.disabled = false;
  //   };

  //   return {
  //     onSubmitForgotPassword,
  //     forgotPassword,
  //     submitButton,
  //   };
  // },
}
</script>
