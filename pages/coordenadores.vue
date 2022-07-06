/* eslint-disable no-console */
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card-title> Coordenadores </v-card-title>
      </v-col>
    </v-row>
    <!-- DIALOG CADASTAR -->
    <v-row>
      <v-dialog
        v-model="dialogStore"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            justify="left"
            class="margin-left"
            v-on="on"
          >
            novo
          </v-btn>
        </template>
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="indexCoordinators()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Cadastrar Coordenador</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="storeCoordinators()"> Salvar </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-row justify="center" class="dialog">
            <v-col cols="8">
              <v-text-field
                v-model="name"
                label="Nome*"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email*"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Senha*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- DIALOG UPDATE -->
    <v-row>
      <v-dialog
        v-model="dialogUpdate"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialogUpdate = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Cadastrar Coordenador</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="updateCoordinators(id)"> Salvar </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-row justify="center" class="dialog">
            <v-col cols="8">
              <v-text-field
                v-model="name"
                label="Nome*"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email*"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Senha*"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Nome</th>
                <th class="text-left">Email</th>
                <th class="text-left">Senha</th>
                <th class="text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in coordinators" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.password }}</td>
                <td>
                  <v-btn
                    depressed
                    color="normal"
                    x-small
                    @click="openDialogUpdate(item)"
                  >
                    Editar
                  </v-btn>

                  <v-btn
                    depressed
                    color="error"
                    x-small
                    @click="destroyCoordinators(item.id)"
                  >
                    Deletar
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Coordenadores',
  data() {
    return {
      id: '',
      name: '',
      email: '',
      password: '',
      dialogStore: false,
      dialogUpdate: false,
      notifications: false,
      sound: true,
      widgets: false,
      coordinators: [],
    }
  },
  created() {
    this.indexCoordinators()
  },

  methods: {
    async indexCoordinators() {
      const coordinators = await axios.get('http://127.0.0.1:3333/coordinators')
      this.coordinators = coordinators.data
      this.dialogStore = false
    },

    async storeCoordinators() {
      try {
        const coordinator = await axios.post(
          'http://127.0.0.1:3333/coordinators',
          {
            name: this.name,
            email: this.email,
            password: this.password,
          }
        )

        console.log(coordinator)
        this.indexCoordinators()
      } catch (error) {
        console.log(error)
      }
    },

    openDialogUpdate(item) {
      this.dialogUpdate = true
      this.id = item.id
      this.name = item.name
      this.email = item.email
      this.password = item.password
      console.log(this.id)

      this.indexCoordinators()
    },

    clearInputs() {
      this.id = ''
      this.name = ''
      this.email = ''
      this.password = ''
    },

    async updateCoordinators(id) {
      try {
        const coordinator = await axios.put(
          `http://127.0.0.1:3333/coordinators/${id}`,
          {
            name: this.name,
            email: this.email,
            password: this.password,
          }
        )

        console.log(coordinator)
        this.dialogUpdate = false
        this.clearInputs()
        this.indexCoordinators()
      } catch (error) {
        console.log(error)
      }
    },

    async destroyCoordinators(id) {
      await axios.delete(`http://127.0.0.1:3333/coordinators/${id}`)
      this.indexCoordinators()
    },
  },
}
</script>

<style scoped>
.margin-left {
  margin-left: 10px;
}

.dialog {
  margin-top: 30px;
}
</style>
