<!-- eslint-disable no-undef -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <NuxtLink
          to="/internships"
          style="text-decoration: none; color: inherit"
          ><v-btn color="primary" x-small text>
            <v-icon small> mdi-chevron-left </v-icon> Voltar
          </v-btn>
        </NuxtLink>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table dense class="elevation-1">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Aluno</th>
                <th class="text-left">Empresa</th>
                <th class="text-left">Status</th>
                <th class="text-left">Início</th>
                <th class="text-left">Fim</th>
                <th class="text-left">Plano de Atividades</th>
                <th class="text-left">Relatório</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ internship_details.student_name }}</td>
                <td>{{ internship_details.company_name }}</td>
                <td>
                  <v-chip
                    dark
                    small
                    :color="getColorStatus(internship_details.status)"
                  >
                    {{ internship_details.status }}
                  </v-chip>
                </td>
                <td>{{ internship_details.initial_date }}</td>
                <td>{{ internship_details.final_date }}</td>
                <td>
                  <v-chip
                    dark
                    small
                    :color="
                      getColorActivitiesPlan(internship_details.activities_plan)
                    "
                  >
                    {{ internship_details.activities_plan }}
                  </v-chip>
                </td>
                <td>
                  <v-chip
                    dark
                    small
                    :color="getColorReport(internship_details.report)"
                  >
                    {{ internship_details.report }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="name"
          class="elevation-1"
        >
          <template #item.status="{ item }">
            <v-chip dark small :color="getColorStatus(item.status)">
              {{ item.status }}
            </v-chip>
          </template>

          <template #item.activities_plan="{ item }">
            <v-chip
              dark
              small
              :color="getColorActivitiesPlan(item.activities_plan)"
            >
              {{ item.activities_plan }}
            </v-chip>
          </template>

          <template #item.report="{ item }">
            <v-chip dark small :color="getColorReport(item.report)">
              {{ item.report }}
            </v-chip>
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Renovações</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Novo
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-autocomplete
                            v-model="editedItem.company_id"
                            label="Empresa"
                            :items="itemsCompanies"
                            item-text="name"
                            item-value="id"
                          ></v-autocomplete>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.teacher_id"
                            label="Orientador"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.supervisor"
                            label="Supervisor"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.initial_date"
                            label="Data de início"
                            v-mask="'##/##/####'"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.final_date"
                            label="Data de término"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.wage"
                            label="Bolsa (R$)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.aid"
                            label="Auxílio (R$)"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.health_insurance_code"
                            label="Número do Seguro"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.health_insurance_company"
                            label="Seguradora"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.weekly_working_hours"
                            label="Carga horária semanal"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="editedItem.category"
                            :items="itemsCategory"
                            label="Categoria"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="editedItem.modality"
                            :items="itemsModality"
                            label="Modalidade"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="editedItem.status"
                            :items="itemsStatus"
                            label="Status"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="editedItem.activities_plan"
                            :items="itemsActivitiesPlan"
                            label="Plano de Atividades"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="editedItem.report"
                            :items="itemsReport"
                            label="Relatório"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancelar
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Salvar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="600px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Tem certeza que deseja apagar este item?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >Cancelar</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >OK</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import { format } from 'date-fns'

export default {
  data: () => ({
    dessertsEdited: [],
    itemsStudents: [],
    itemsCompanies: [],
    itemsStatus: ['Em andamento', 'Finalizado', 'Cancelado'],
    itemsActivitiesPlan: ['Pendente', 'Entregue'],
    itemsReport: ['Pendente', 'Entregue'],
    itemsCategory: ['Obrigatório', 'Não Obrigatório'],
    itemsModality: ['Presencial', 'Remoto', 'Híbrido'],
    internship_id: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Aluno',
        align: 'start',
        sortable: false,
        value: 'student_name',
      },
      { text: 'Empresa', value: 'company_name', sortable: false },
      { text: 'Status', value: 'status', sortable: false },
      { text: 'Início', value: 'initial_date', sortable: false },
      { text: 'Fim', value: 'final_date', sortable: false },
      {
        text: 'Plano de Atividades',
        value: 'activities_plan',
        sortable: false,
      },
      { text: 'Relatório', value: 'report', sortable: false },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      internship_id: '',
      company_id: '',
      teacher_id: '',
      supervisor: '',
      initial_date: '',
      final_date: '',
      wage: '',
      aid: '',
      health_insurance_code: '',
      health_insurance_company: '',
      weekly_working_hours: '',
      category: '',
      modality: '',
      activities_plan: '',
      report: '',
      status: '',
    },
    defaultItem: {
      id: '',
      internship_id: '',
      company_id: '',
      teacher_id: '',
      supervisor: '',
      initial_date: '',
      final_date: '',
      wage: '',
      aid: '',
      health_insurance_code: '',
      health_insurance_company: '',
      weekly_working_hours: '',
      category: '',
      modality: '',
      activities_plan: '',
      report: '',
      status: '',
    },
    internship_details: {
      internship_id: '',
      student_name: '',
      company_name: '',
      teacher_name: '',
      supervisor: '',
      initial_date: '',
      final_date: '',
      wage: '',
      aid: '',
      health_insurance_code: '',
      health_insurance_company: '',
      weekly_working_hours: '',
      category: '',
      modality: '',
      activities_plan: '',
      report: '',
      status: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Renovação ' : 'Editar Renovação'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async getStudents() {
      const students = await axios.get(`http://127.0.0.1:3333/students`)

      this.itemsStudents = students.data
    },

    async getCompanies() {
      const companies = await axios.get(`http://127.0.0.1:3333/companies`)

      this.itemsCompanies = companies.data
    },
    getColorStatus(statusColor) {
      if (statusColor === 'Em andamento') return 'orange'
      else if (statusColor === 'Finalizado') return 'green'
      else return 'red'
    },

    getColorActivitiesPlan(statusColor) {
      if (statusColor === 'Pendente') return 'red'
      else return 'green'
    },

    getColorReport(statusColor) {
      if (statusColor === 'Pendente') return 'red'
      else return 'green'
    },
    async getInternships() {
      const internshipDetails = await axios.get(
        `http://127.0.0.1:3333/internships/${this.$route.params.id}`
      )
      this.internship_details = internshipDetails.data[0]
      console.log(this.internship_details)
    },

    formatDateForBrazil(e) {
      const date = new Date(e.initial_date)
      const dateFormated = format(date, 'dd/MM/yyyy')
      e.initial_date = dateFormated

      const finalDate = new Date(e.final_date)
      const FinalDateFormated = format(finalDate, 'dd/MM/yyyy')
      e.final_date = FinalDateFormated

      return e
    },

    formatDateForISO(str) {
      const dateFormated = format(str, 'yyyy-MM-dd')
      return dateFormated
    },

    async showPeriods() {
      const periods = await axios.get(
        `http://127.0.0.1:3333/periods/${this.internship_id}`
      )
      this.dessertsEdited = periods.data

      this.desserts = this.dessertsEdited.map(this.formatDateForBrazil)

      console.log(this.desserts)
      //this.desserts = periods.data
    },

    async store() {
      try {
        const student = await axios.post(`http://127.0.0.1:3333/periods`, {
          internship_id: this.$route.params.id,
          student_id: this.internship_details.student_id,
          company_id: this.editedItem.company_id,
          teacher_id: this.editedItem.teacher_id,
          supervisor: this.editedItem.supervisor,
          initial_date: this.editedItem.initial_date,
          final_date: this.editedItem.final_date,
          wage: this.editedItem.wage,
          aid: this.editedItem.aid,
          health_insurance_code: this.editedItem.health_insurance_code,
          health_insurance_company: this.editedItem.health_insurance_company,
          weekly_working_hours: this.editedItem.weekly_working_hours,
          category: this.editedItem.category,
          modality: this.editedItem.modality,
          activities_plan: this.editedItem.activities_plan,
          report: this.editedItem.report,
          status: this.editedItem.status,
        })

        // eslint-disable-next-line no-undef
        console.log(student)
        this.initialize()
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.log(error)
      }
    },

    async update(id) {
      try {
        const student = await axios.put(
          `http://127.0.0.1:3333/periods/${id}`,
          this.editedItem
        )

        // eslint-disable-next-line no-undef
        console.log(student)
        this.initialize()
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error(error)
      }
    },
    async destroy(id) {
      await axios.delete(`http://127.0.0.1:3333/courses/${id}`)
      this.initialize()
    },

    async initialize() {
      this.internship_id = this.$route.params.id
      console.log(this.internship_id)

      this.getInternships()
      this.showPeriods()
      this.getStudents()
      this.getCompanies()
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.destroy(this.editedItem.id)
      // eslint-disable-next-line no-undef
      console.log(this.editedIndex)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        // Object.assign(this.desserts[this.editedIndex], this.editedItem)
        this.update(this.editedItem.id)
        // eslint-disable-next-line no-undef
        console.log(this.editedItem)
      } else {
        this.store()
      }
      this.close()
    },
  },
}
</script>
