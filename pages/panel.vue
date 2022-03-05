<template>
  <div class="rounded-lg shadow bg-base-200 drawer drawer-mobile h-screen">
    <input id="drawer" type="checkbox" class="drawer-toggle" />

    <div
      v-if="!loggedIn"
      class="flex flex-col drawer-content items-center justify-center"
    >
      <label
        for="drawer"
        class="mb-4 btn btn-primary drawer-button lg:hidden"
        >Avaa valikko</label
      >
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

        <div class="card-body">
          <div v-if="failedLogin">
            <div class="alert shadow-lg alert-warning">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <span>Varoitus: Kirjautuminen epäonnistui (väärä käyttäjänimi tai salasana)!</span>
              </div>
            </div>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Oma sähköposti</span>
            </label>
            <label class="input-group input-group-md">
              <input
                v-model="user"
                type="text"
                placeholder="matti"
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

          <div class="form-control mt-6">
            <input type="button" value="Kirjaudu" class="btn btn-primary" @click="login()" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex flex-col drawer-content items-center justify-center"
    >
      <label
        for="drawer"
        class="mb-4 btn btn-primary drawer-button lg:hidden"
        >Avaa valikko</label
      >

      <div v-if="alert.length > 0" class="alert shadow-lg alert-warning">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <span>Varoitus: {{ alert }}</span>
        </div>
      </div>

      <div v-if="success.length > 0" class="alert shadow-lg alert-success">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ success }}</span>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-8 p-8">
        <div>
          <div class="shadow stats">
            <div class="stat">
              <div class="stat-title">Viestejä postilaatikossa</div>
              <div class="stat-value">{{ sentMessages }}</div>
            </div>
          </div>
        </div>

        <div>
          <div class="shadow stats">
            <div class="stat">
              <div class="stat-title">Sähköposti</div>
              <div class="stat-value">{{ user }}@{{ domain }}</div>
            </div>
          </div>
        </div>

        <div>
          <div class="p-6 space-y-2 artboard phone bg-base-100">
            <b>Käytetty tallennustilaa:</b>
            <progress
              class="progress"
              :class="[progressClass]"
              :value="percentUsed"
              max="100"
            ></progress>
            <span class="inline-block">{{ percentUsed }}%</span>
            <span class="float-right inline-block">
              {{ quotaUsed }}/{{ quota }} Mt
            </span>
          </div>
        </div>

        <div>
          <div class="shadow stats">
            <div class="stat">
              <div class="stat-title">Tili aktiivinen</div>
              <div class="stat-value">{{ active }}</div>
            </div>
          </div>
        </div>

        <div>
          <div class="card lg:card-side card-bordered bg-base-100">
            <div class="card-body">
              <h2 class="card-title">Salasanan vaihto</h2>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Vanha salasana</span>
                </label>
                <input
                  v-model="changePasswordOld"
                  type="password"
                  placeholder="Vanha salasana"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Uusi salasana</span>
                </label>
                <input
                  v-model="changePasswordNew"
                  type="password"
                  placeholder="Uusi salasana"
                  class="input input-bordered"
                />
              </div>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Uusi salasana uudestaan</span>
                </label>
                <input
                  v-model="changePasswordNew2"
                  type="password"
                  placeholder="Uusi salasana uudestaan"
                  class="input input-bordered"
                />
              </div>

              <div class="card-actions">
                <button class="btn btn-primary" @click="changePassword()">Päivitä</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="p-6 space-y-2 artboard phone bg-base-100">
            <b>Viimeisimmät kirjautumiset:</b>
            <p>SMTP: </p>{{ lastSmtpLogin }}
            <p>IMAP: </p>{{ lastImapLogin }}
          </div>
        </div>


        <div></div>
      </div>
    </div>

    <div class="drawer-side">
      <label for="drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <li>
          <a v-if="!loggedIn">Kirjaudu</a>
        </li>
        <div v-if="loggedIn">
          <!-- TODO: implement later <li>
            <a>Statistiikat</a>
          </li> -->
          <li>
            <a>Asetukset</a>
          </li>
          <li>
            <a href="https://mail.imap.fi">Webmail</a>
          </li>
          <li>
            <a @click="logOut()">Kirjaudu ulos</a>
          </li>
        </div>
        <div class="divider">TAI</div>
        <li>
          <NuxtLink to="/"> Etusivu </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const loaderConfig = {
    container: false,
    canCancel: false,
    color: "#570df8",
    loader: "dots",
    height: 128,
    width: 128
}

export default {
  name: 'ControlPanel',
  data: () => ({
    loggedIn: false,
    user: "",
    pass: "",
    failedLogin: false,
    token: "",
    changePasswordOld: "",
    changePasswordNew: "",
    changePasswordNew2: "",
    alert: "",
    success: "",

    // User infos
    percentUsed: 0,
    progressClass: 'progress-success',
    quotaUsed: 0,
    quota: 0,
    sentMessages: 0,
    domain: 'imap.fi',
    active: '',
    lastImapLogin: "",
    lastSmtpLogin: "",
  }),
  mounted() {
    if (localStorage.user)
      this.user = localStorage.user
    if (localStorage.token)
      this.token = localStorage.token
    if (localStorage.loggedIn)
      this.loggedIn = localStorage.loggedIn
    if (this.token && this.user && this.loggedIn)
      this.info()
  },
  methods: {
    async login() {

      const loader = this.$loading.show(loaderConfig);

      const rawResponse = await fetch(process.env.apiUrl + '/auth', {
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

      if (!content.success) {
        loader.hide();
        this.failedLogin = true
      }
      else {
        this.loggedIn = true
        this.token = content.token

        localStorage.token = content.token
        localStorage.loggedIn = true
        localStorage.user = this.user.replace('@imap.fi', '')
        loader.hide();
        this.info();
      }
    },
    async info() {
      const loader = this.$loading.show(loaderConfig);

      const rawResponse = await fetch(process.env.apiUrl + '/account?' + new URLSearchParams({
          email: this.user,
        }), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
      });

      if (rawResponse.status !== 200) {
        loader.hide();
        this.logOut()
        return
      }

      const content = await rawResponse.json();

      this.percentUsed = content.mailBox.percent_in_use
      this.progressClass = `progress-${content.mailBox.percent_class}`
      this.quotaUsed = Math.round(content.mailBox.quota_used/1024/1024)
      this.quota = Math.round(content.mailBox.quota/1024/1024)
      this.sentMessages = content.mailBox.messages
      this.active = content.mailBox.active === 1 ? "kyllä" : "ei"
      this.lastSmtpLogin = content.mailBox.last_smtp_login > 0 ? new Date(content.mailBox.last_smtp_login * 1000).toLocaleDateString("fi-FI") : "ei kirjauduttu"
      this.lastImapLogin = content.mailBox.last_imap_login > 0 ? new Date(content.mailBox.last_imap_login * 1000).toLocaleDateString("fi-FI") : "ei kirjauduttu"

      loader.hide();

    },
    logOut() {
      localStorage.clear()
      this.loggedIn = false
      this.token = ""
      this.pass = ""
    },
    async changePassword() {
      const loader = this.$loading.show(loaderConfig);

      const rawResponseAuth = await fetch(process.env.apiUrl + '/auth', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: `${this.user}`,
          password: this.changePasswordOld
        })
      });

      const contentAuth = await rawResponseAuth.json();

      if (!contentAuth.success) {
        loader.hide()
        this.alert = "Vanha salasana on väärä"
        return
      }

      if (this.changePasswordNew !== this.changePasswordNew2)
        this.alert = "Salasanat eivät täsmää"

      const rawResponse = await fetch(process.env.apiUrl + '/account', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: this.changePasswordNew,
          token: this.token,
        })
      });

      const content = await rawResponse.json();

      if (rawResponse.status !== 200)
        this.alert = content.message
      else {
        this.success = content.message
        this.changePasswordOld = this.changePasswordNew = this.changePasswordNew2 = ""
      }

      loader.hide()
    }
    // TODO: add account recovery mail
  }
}
</script>
