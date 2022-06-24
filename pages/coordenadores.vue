/* eslint-disable no-console */
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card-title> Coordenadores </v-card-title>
      </v-col>
    </v-row>

    <v-row justify="left" class="margin-left">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template #activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" small v-on="on">
            Novo
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Cadastrar Coordenador</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    label="Nome*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    label="Email*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    label="Senha*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*Campos obirgatórios</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" text @click="storeCoodinators()">
              Salvar
            </v-btn>
          </v-card-actions>
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
              <tr v-for="item in coordinators" :key="item.name">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.password }}</td>
                <td>
                  <v-btn depressed x-small> Editar </v-btn>

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
      name: '',
      email: '',
      password: '',
      dialog: false,
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
    },

    async storeCoodinators() {
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
        this.dialog = false
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
</style>
