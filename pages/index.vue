<template>
  <div>
    <TheHeader />

    <div class="hero min-h-screen bg-base-200">
      <div class="flex-col justify-center hero-content lg:flex-row">
        <div class="text-center lg:text-left">
          <h1 class="mb-5 text-5xl font-bold">imap.fi</h1>
          <p class="mb-5">
            Tämä on imap.fi. Kyseessä on harrastuksena ylläpidetty sähköposti.
            Voit rekisteröityä oikealta. Jos harrastuspohjainen toiminta
            huolettaa, voit katsoa palvelimien yhtäjaksoisen päälläoloajan
            <a href="https://status.imap.fi" class="btn" target="_blank"
              >status-sivuilta</a
            >. Tarjoamme kaikille käyttäjille 512 Mt tallennustilaa.
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <div v-html="alert"></div>
            <h2 class="card-title">Rekisteröidy!</h2>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Haluttu sähköposti</span>
              </label>
              <label class="input-group input-group-md">
                <input
                  v-model="user"
                  type="text"
                  placeholder="matti.lattu"
                  required
                  class="input input-bordered input-md"
                />
                <span>@imap.fi</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Salasana</span>
              </label>
              <input
                v-model="pass"
                type="password"
                placeholder="salasana"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Salasana uudestaan</span>
              </label>
              <input
                v-model="pass2"
                type="password"
                placeholder="salasana"
                class="input input-bordered"
              />
            </div>

            <div class="form-control mt-6">
              <input
                type="button"
                value="Rekisteröidy"
                class="btn btn-primary"
                @click="register()"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'

const loaderConfig = {
    container: false,
    canCancel: false,
    color: "#570df8",
    loader: "dots",
    height: 128,
    width: 128
}

export default {
  name: 'IndexPage',
  components: { TheHeader },
  data: () => ({
    user: "",
    pass: "",
    pass2: "",
    alert: ""
  }),
  methods: {
    async register() {
      const loader = this.$loading.show(loaderConfig);

      if (!(this.pass === this.pass2))
        this.alert = `<div class="alert shadow-lg alert-warning"> <div> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> <span>Varoitus: Salasanojen tulee täsmätä!</span> </div> </div><br>`


      const rawResponse = await fetch(process.env.apiUrl + '/account', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.user.replace('@imap.fi', ''),
          password: this.pass
        })
      });

      const content = await rawResponse.json();

      if (rawResponse.status !== 200)
        this.alert = `<div class="alert shadow-lg alert-warning"> <div> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> <span>Varoitus: ${content.message}</span> </div> </div><br>`
      else {
        this.loggedIn = true
        this.token = content.token

        localStorage.token = content.token
        localStorage.loggedIn = true
        localStorage.user = this.user.replace('@imap.fi', '')

        this.$router.push('/panel')
      }
      
      loader.hide()
    }
  }
}
</script>
