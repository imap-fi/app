<template>
  <div>
    <div
      class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box"
    >
      <div class="flex-none px-2 mx-2">
        <span class="text-lg font-bold"> imap.fi </span>
      </div>
      <div class="flex-1 px-2 mx-2">
        <div class="items-stretch hidden lg:flex">
          <NuxtLink to="/" class="btn btn-ghost btn-sm rounded-btn">
            Koti
          </NuxtLink>
          <NuxtLink to="/faq" class="btn btn-ghost btn-sm rounded-btn">
            UKK
          </NuxtLink>
        </div>
      </div>
      <div class="flex-none">
        <a
          class="btn btn-ghost btn-sm rounded-btn"
          href="https://mail.imap.fi"
          target="_blank"
        >
          Webmail
        </a>
        <NuxtLink to="/panel" class="btn btn-ghost btn-sm rounded-btn">
          Hallinnoi tiliä
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
