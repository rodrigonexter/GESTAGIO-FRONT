/* eslint-disable no-console */
/* eslint-disable no-console */
<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="black">
                <v-toolbar-title>Login Administrador</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login.email"
                    name="login"
                    label="Usuário"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="login.password"
                    name="password"
                    label="Senha"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="black" dark @click="loginGod()">Entrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'emptyPage',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },

  methods: {
    async loginGod() {
      await this.$auth
        .loginWith('local', { data: this.login })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('logado com sucesso!!!!!')
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log('erro!!!')
          // eslint-disable-next-line no-console
          console.log(error.response.status)
          if (error.response.status === 401) {
            // redirect to error page
            console.log('veio até aqui')
            // eslint-disable-next-line no-undef
            this.$router.push('/errorLoginGod')
          }
        })
    },
  },
}
</script>

<style></style>
