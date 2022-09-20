<template>
  <section>
    <!--begin::Basic info-->
    <div class="card mb-5 mb-xl-10">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">
            Profile Details
          </h3>
        </div>
        <!--end::Card title-->
      </div>
      <!--begin::Card header-->

      <!--begin::Content-->
      <div id="kt_account_profile_details" class="collapse show">
        <!--begin::Form-->
        <form
          id="kt_account_profile_details_form"
          class="form"
          novalidate="novalidate"
          @submit="updateProfile"
        >
          <!--begin::Card body-->
          <div class="card-body border-top p-9">
            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label fw-semobold fs-6">
                Avatar
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Image input-->
                <div
                  class="image-input image-input-outline"
                  data-kt-image-input="true"
                  style="background-image: url(media/avatars/blank.png)"
                >
                  <!--begin::Preview existing avatar-->
                  <div
                    class="image-input-wrapper w-125px h-125px"
                    :style="`background-image: url(${user.picture})`"
                  />
                  <!--end::Preview existing avatar-->

                  <!--begin::Label-->
                  <label
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                    data-kt-image-input-action="change"
                    data-bs-toggle="tooltip"
                    title="Change avatar"
                  >
                    <i class="bi bi-pencil-fill fs-7" />

                    <!--begin::Inputs-->
                    <input type="file" name="avatar" accept=".png, .jpg, .jpeg">
                    <input type="hidden" name="avatar_remove">
                    <!--end::Inputs-->
                  </label>
                  <!--end::Label-->

                  <!--begin::Remove-->
                  <span
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                    data-kt-image-input-action="remove"
                    data-bs-toggle="tooltip"
                    title="Remove avatar"
                    @click="removeImage()"
                  >
                    <i class="bi bi-x fs-2" />
                  </span>
                  <!--end::Remove-->
                </div>
                <!--end::Image input-->

                <!--begin::Hint-->
                <div class="form-text">
                  Allowed file types: png, jpg, jpeg.
                </div>
                <!--end::Hint-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6">
                Display Name
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8">
                <!--begin::Row-->
                <div class="row">
                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row">
                    <input
                      v-model="profileDetails.name"
                      type="text"
                      name="fname"
                      class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="First name"
                    >
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6 fv-row">
                    <input
                      v-model="profileDetails.surname"
                      type="text"
                      name="lname"
                      class="form-control form-control-lg form-control-solid"
                      placeholder="Last name"
                    >
                  </div>
                  <!--end::Col-->
                </div>
                <!--end::Row-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6">
                First Name
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <input
                  v-model="user.firstName"
                  type="text"
                  name="company"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Company name"
                >
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row mb-6">
              <!--begin::Label-->
              <label class="col-lg-4 col-form-label required fw-semobold fs-6">
                Last Name
              </label>
              <!--end::Label-->

              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <input
                  v-model="user.lastName"
                  type="text"
                  name="company"
                  class="form-control form-control-lg form-control-solid"
                  placeholder="Company name"
                >
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Card body-->

          <!--begin::Actions-->
          <div class="card-footer d-flex justify-content-end py-6 px-9">
            <button
              type="reset"
              class="btn btn-light btn-active-light-primary me-2"
            >
              Discard
            </button>

            <button
              id="kt_account_profile_details_submit"
              ref="submitButton1"
              type="submit"
              class="btn btn-primary"
            >
              <span class="indicator-label"> Save Changes </span>
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
      <!--end::Content-->
    </div>
    <!--end::Basic info-->

    <!--begin::Sign-in Method-->
    <div class="card mb-5 mb-xl-10">
      <!--begin::Card header-->
      <div
        class="card-header border-0 cursor-pointer"
        role="button"
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_signin_method"
      >
        <div class="card-title m-0">
          <h3 class="fw-bolder m-0">
            Sign-in Method
          </h3>
        </div>
      </div>
      <!--end::Card header-->

      <!--begin::Content-->
      <div id="kt_account_signin_method" class="collapse show">
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Email Address-->
          <div class="d-flex flex-wrap align-items-center mb-8">
            <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
              <div class="fs-4 fw-bolder mb-1">
                Email Address
              </div>
              <div class="fs-6 fw-semobold text-gray-600">
                support@keenthemes.com
              </div>
            </div>

            <div
              id="kt_signin_email_edit"
              :class="{ 'd-none': !emailFormDisplay }"
              class="flex-row-fluid"
            >
              <!--begin::Form-->
              <form
                id="kt_signin_change_email"
                class="form"
                novalidate="novalidate"
                @submit="updateEmail()"
              >
                <div class="row mb-6">
                  <div class="col-lg-6 mb-4 mb-lg-0">
                    <div class="fv-row mb-0">
                      <label
                        for="emailaddress"
                        class="form-label fs-6 fw-bold mb-3"
                      >
                        Enter New Email Address
                      </label>
                      <input
                        id="emailaddress"
                        type="email"
                        class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                        placeholder="Email Address"
                        name="emailaddress"
                        value="support@keenthemes.com"
                      >
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="fv-row mb-0">
                      <label
                        for="confirmemailpassword"
                        class="form-label fs-6 fw-bold mb-3"
                      >
                        Confirm Password
                      </label>
                      <input
                        id="confirmemailpassword"
                        type="password"
                        class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                        name="confirmemailpassword"
                      >
                    </div>
                  </div>
                </div>
                <div class="d-flex">
                  <button
                    id="kt_signin_submit"
                    ref="updateEmailButton"
                    type="submit"
                    class="btn btn-primary me-2 px-6"
                  >
                    <span class="indicator-label"> Update Email </span>
                    <span class="indicator-progress">
                      Please wait...
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      />
                    </span>
                  </button>
                  <button
                    id="kt_signin_cancel"
                    type="button"
                    class="btn btn-color-gray-400 btn-active-light-primary px-6"
                    @click="emailFormDisplay = !emailFormDisplay"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <!--end::Form-->
            </div>
            <div
              id="kt_signin_email_button"
              :class="{ 'd-none': emailFormDisplay }"
              class="ms-auto"
            >
              <button
                class="btn btn-light fw-bolder px-6"
                @click="emailFormDisplay = !emailFormDisplay"
              >
                Change Email
              </button>
            </div>
          </div>
          <!--end::Email Address-->

          <!--begin::Password-->
          <div class="d-flex flex-wrap align-items-center mb-8">
            <div
              id="kt_signin_password"
              :class="{ 'd-none': passwordFormDisplay }"
            >
              <div class="fs-4 fw-bolder mb-1">
                Password
              </div>
              <div class="fs-6 fw-semobold text-gray-600">
                ************
              </div>
            </div>
            <div
              id="kt_signin_password_button"
              class="ms-auto"
              :class="{ 'd-none': passwordFormDisplay }"
            >
              <button
                class="btn btn-light fw-bolder"
                @click="passwordFormDisplay = !passwordFormDisplay"
              >
                Reset Password
              </button>
            </div>
          </div>
          <!--end::Password-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Content-->
    </div>
  <!--end::Sign-in Method-->
  </section>
</template>

<script lang="ts">
export default {
  name: 'AccountSettings',
  layout: 'AccountLayout',
  methods: {
    updateUser () {},
    updatePicture () {}
  }
}
</script>
