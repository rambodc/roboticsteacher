<template>
  <!--begin::details View-->
  <div id="kt_profile_details_view" class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">
          Profile Details
        </h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <router-link
        to="settings"
        class="btn btn-primary align-self-center"
      >
        Edit Profile
      </router-link>
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Display Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">Max Smith</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">First Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">Max</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Last Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">Smith</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Email</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark"> maxsmith@emial.com </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->
      <div
        class="notice d-flex bg-light-warning rounded border-warning border border-dashed p-6"
      >
        <span class="svg-icon svg-icon-2tx svg-icon-warning me-4">
          <inline-svg src="media/icons/duotune/general/gen044.svg" />
        </span>
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack flex-grow-1">
          <!--begin::Content-->
          <div class="fw-semobold">
            <h4 class="text-gray-800 fw-bold">
              We need your attention!
            </h4>

            <div class="fs-6 text-gray-600">
              You need to verify your email.
              <p class="fw-bold">
                Send verification email
              </p>.
            </div>
          </div>
          <!--end::Content-->
        </div>
        <!--end::Wrapper-->
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
export default {
  name: 'AccountOverview',
  layout: 'AccountLayout'
}
</script>
