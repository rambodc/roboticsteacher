<template>
  <section>
    <!--begin::Navbar-->
    <div class="card mb-5 mb-xl-10">
      <div class="card-body pt-9 pb-0">
        <!--begin::Details-->
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
          <!--begin: Pic-->
          <div class="me-7 mb-4">
            <div
              class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
            >
              <img src="media/avatars/300-1.jpg" alt="image">
              <div
                class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
              />
            </div>
          </div>
          <!--end::Pic-->

          <!--begin::Info-->
          <div class="flex-grow-1">
            <!--begin::Title-->
            <div
              class="d-flex justify-content-between align-items-start flex-wrap mb-2"
            >
              <!--begin::User-->
              <div class="d-flex flex-column">
                <!--begin::Name-->
                <div class="d-flex align-items-center mb-2">
                  <a
                    href="#"
                    class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                  >
                    Max Smith</a>
                </div>
                <!--end::Name-->
              </div>
              <!--end::User-->
            </div>
            <!--end::Title-->
          </div>
          <!--end::Info-->
        </div>
        <!--end::Details-->

        <!--begin::Navs-->
        <div class="d-flex overflow-auto h-55px">
          <ul
            class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
          >
            <!--begin::Nav item-->
            <li class="nav-item">
              <router-link
                to="overview"
                class="nav-link text-active-primary me-6"
                active-class="active"
              >
                Overview
              </router-link>
            </li>
            <!--end::Nav item-->
            <!--begin::Nav item-->
            <li class="nav-item">
              <router-link
                to="settings"
                class="nav-link text-active-primary me-6"
                active-class="active"
              >
                Settings
              </router-link>
            </li>
          <!--end::Nav item-->
          </ul>
        </div>
        <!--begin::Navs-->
      </div>
    </div>
    <!--end::Navbar-->
    <Nuxt />
  </section>
</template>

<script lang="ts">

export default {
  name: 'AccountLayout'
}
</script>
