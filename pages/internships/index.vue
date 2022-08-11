<!-- eslint-disable no-undef -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <!-- Dialog edit item alternative -->

        <!-- /Dialog edit item alternative -->

        <v-data-table
          :headers="headers"
          :items="desserts"
          sort-by="name"
          class="elevation-1"
        >
          <template #item.status="{ item }">
            <v-chip dark :color="getColorStatus(item.status)">
              {{ item.status }}
            </v-chip>
          </template>

          <template #item.activities_plan="{ item }">
            <v-chip dark :color="getColorActivitiesPlan(item.activities_plan)">
              {{ item.activities_plan }}
            </v-chip>
          </template>

          <template #item.report="{ item }">
            <v-chip dark :color="getColorReport(item.report)">
              {{ item.report }}
            </v-chip>
          </template>

          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Estágios</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <!-- dialog -->
              <v-dialog v-model="dialog" max-width="900px">
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
                <!-- form ===================================================-->
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-autocomplete
                            v-model="editedItem.student_id"
                            label="Aluno"
                            :items="itemsStudents"
                            item-value="id"
                            item-text="name"
                          ></v-autocomplete>
                        </v-col>

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
              <!-- /dialog -->
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
            <v-icon
              small
              class="mr-2"
              @click="printReport(item.id, item.student_id, item.company_id)"
            >
              mdi-printer
            </v-icon>
            <v-icon small class="mr-2" @click="internshipMore(item.id)">
              mdi-dots-vertical
            </v-icon>
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
import moment from 'moment'
import jsPDF from 'jspdf'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogAlternative: false,
    itemsStatus: ['Em andamento', 'Finalizado', 'Cancelado'],
    itemsActivitiesPlan: ['Pendente', 'Entregue'],
    itemsReport: ['Pendente', 'Entregue'],
    itemsCategory: ['Obrigatório', 'Não Obrigatório'],
    itemsModality: ['Presencial', 'Remoto', 'Híbrido'],
    itemsStudents: [],
    itemsCompanies: [],
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
        text: 'Plano de atividades',
        value: 'activities_plan',
        sortable: false,
      },
      { text: 'Relatório', value: 'report', sortable: false },
      { text: 'Ações', value: 'actions', sortable: false },
    ],
    desserts: [],
    dessertsEdited: [],
    editedIndex: -1,
    editedItem: {
      id: '',
      student_id: '',
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
      student_id: '',
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
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Estágio ' : 'Editar Estágio'
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

    async store() {
      try {
        const student = await axios.post(`http://127.0.0.1:3333/internships`, {
          //  student_id, company_id, teacher_id, supervisor, initial_date, final_date, wage, aid, health_insurance_code, health_insurance_company, weekly_working_hours, category, modality, activities_plan, report, status

          student_id: this.editedItem.student_id,
          company_id: this.editedItem.company_id,
          teacher_id: this.editedItem.teacher_id,
          supervisor: this.editedItem.supervisor,
          initial_date: this.formatDateForISO(this.editedItem.initial_date),
          final_date: this.formatDateForISO(this.editedItem.final_date),
          wage: this.editedItem.wage,
          aid: this.editedItem.aid,
          health_insurance_code: this.editedItem.health_insurance_code,
          health_insurance_company: this.editedItem.health_insurance_company,
          weekly_working_hours: this.editedItem.weekly_working_hours,
          category: this.editedItem.category,
          modality: this.editedItem.modality,
          activities_plan: 'Pendente',
          report: 'Pendente',
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
        const internship = await axios.put(
          `http://127.0.0.1:3333/internships/${id}`,
          {
            student_id: this.editedItem.student_id,
            company_id: this.editedItem.company_id,
            teacher_id: this.editedItem.teacher_id,
            supervisor: this.editedItem.supervisor,
            initial_date: this.formatDateForISO(this.editedItem.initial_date),
            final_date: this.formatDateForISO(this.editedItem.final_date),
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
          }
        )

        // eslint-disable-next-line no-undef
        console.log(internship)
        this.initialize()
      } catch (error) {
        // eslint-disable-next-line no-undef
        console.error(error)
      }
    },
    async destroy(id) {
      await axios.delete(`http://127.0.0.1:3333/internships/${id}`)
      this.initialize()
    },

    formatDateForBrazil(e) {
      const initialDate = moment(e.initial_date).format('DD/MM/YYYY')
      const finalDate = moment(e.final_date).format('DD/MM/YYYY')
      e.initial_date = initialDate

      e.final_date = finalDate

      return e
    },
    // BD ESTÁ RECEBENDO YYYY-MM-DD
    formatDateForISO(str) {
      console.log(str, 'aqui')
      const date = moment(str, 'DD/MM/YYYY')
      const dateFormated = date.format('YYYY-MM-DD')
      console.log(dateFormated)

      return dateFormated
    },

    internshipMore(id) {
      this.$router.push(`/internships/${id}`)
    },

    async initialize() {
      const internships = await axios.get(`http://127.0.0.1:3333/internships`)

      this.dessertsEdited = internships.data

      this.desserts = this.dessertsEdited.map(this.formatDateForBrazil)
      console.log(this.desserts)

      this.getStudents()
      this.getCompanies()

      // const str = '2021-12-12T03:00:00.000Z'
      // const date = new Date(str)
      // console.log(format(date, 'dd/MM/yyyy'))
    },

    async printReport(internship_id, student_id, company_id) {
      const doc = new jsPDF()

      const internshipEdited = await axios.get(
        `http://127.0.0.1:3333/internships/${internship_id}`
      )
      const internshipAux = internshipEdited.data.map(this.formatDateForBrazil)
      const internship = internshipAux[0]
      console.log(internship, '<Internship>')

      const studentEdited = await axios.get(
        `http://127.0.0.1:3333/students/${student_id}`
      )
      const student = studentEdited.data
      console.log(student, '<Student>')

      const companyEdited = await axios.get(
        `http://127.0.0.1:3333/companies/${company_id}`
      )
      const company = companyEdited.data
      console.log(company, '<Company>')

      const periodEdited = await axios.get(
        `http://127.0.0.1:3333/periods/${internship_id}`
      )
      const period = periodEdited.data
      console.log(period, '<Period>')

      // TÍTULO
      doc.setFontSize(30)
      doc.text(45, 20, 'RELATÓRIO DE ESTÁGIO')
      // ESTAGIÁRIO
      doc.setFontSize(16)
      doc.text(20, 40, 'ESTAGIÁRIO')
      doc.setFontSize(12)
      doc.text(20, 50, `Nome: ${student.name}`)
      doc.text(20, 55, `E-mail: ${student.email}`)
      doc.text(20, 60, `Telefone: ${student.phone}`)
      doc.text(20, 65, `CPF: ${student.cpf}`)
      doc.text(20, 70, `Matrícula: ${student.student_id}`)
      doc.text(20, 75, `Endereço: ${student.address}`)

      // CURSO
      doc.setFontSize(16)
      doc.text(20, 85, 'CURSO')
      doc.setFontSize(12)
      doc.text(20, 95, ' Sistemas de Informação')

      // DADOS DO PERÍODO DE ESTÁGIO
      doc.setFontSize(16)
      doc.text(20, 105, 'PERÍODO DE ESTÁGIO')
      doc.setFontSize(12)
      doc.text(20, 115, `Empresa: ${company.name}`)
      doc.text(20, 120, `CNPJ: ${company.company_id}`)
      doc.text(20, 125, `E-mail: ${company.email}`)
      doc.text(20, 130, `Telefone: ${company.phone}`)
      doc.text(20, 135, `Endereço: ${company.address}`)
      doc.text(20, 140, `Supervisor: ${internship.supervisor}`)
      doc.text(20, 145, `Orientador: ${internship.teacher_name}`)
      doc.text(20, 150, `Data de Início: ${internship.initial_date}`)
      doc.text(20, 155, `Data de Término: ${internship.final_date}`)
      doc.text(20, 160, `Bolsa: R$${internship.wage}`)
      doc.text(20, 165, `Auxílio: R$${internship.aid}`)
      doc.text(20, 170, `Seguradora: ${internship.health_insurance_company}`)
      doc.text(20, 175, `Numero de Seguro: ${internship.health_insurance_code}`)
      doc.text(
        20,
        180,
        `Carga horária Semanal: ${internship.weekly_working_hours} horas`
      )
      doc.text(20, 185, `Categoria: ${internship.category}`)
      doc.text(20, 190, `Modalidade: ${internship.modality}`)
      doc.text(20, 195, `Status: ${internship.status}`)
      doc.text(20, 200, `Plano de Atividades: ${internship.activities_plan}`)
      doc.text(20, 205, `Relatório: ${internship.report}`)

      let index = 1
      for (let item of period) {
        console.log(item, 'aqui')

        // RENOVAÇÕES
        doc.addPage()
        doc.setFontSize(30)
        doc.text(35, 20, 'RENOVAÇÕES DE ESTÁGIO')
        doc.setFontSize(16)
        doc.text(20, 40, `${index}ª RENOVAÇÃO DE ESTÁGIO`)

        doc.setFontSize(12)
        doc.text(20, 50, `Empresa: ${item.company_name}`)
        doc.text(20, 55, `CNPJ: ${item.company_id}`)
        doc.text(20, 60, `E-mail: ${item.company_email}`)
        doc.text(20, 65, `Telefone: ${item.company_phone}`)
        doc.text(20, 70, `Endereço: ${item.company_address}`)
        doc.text(20, 75, `Supervisor: ${item.supervisor}`)
        doc.text(20, 80, `Orientador: ${item.teacher_name}`)
        doc.text(20, 85, `Data de Início: ${item.initial_date}`)
        doc.text(20, 90, `Data de Término: ${item.final_date}`)
        doc.text(20, 95, `Bolsa: R$${item.wage}`)
        doc.text(20, 100, `Auxílio: R$${item.aid}`)
        doc.text(20, 105, `Seguradora: ${item.health_insurance_company}`)
        doc.text(20, 110, `Numero de Seguro: ${item.health_insurance_code}`)
        doc.text(
          20,
          115,
          `Carga horária Semanal: ${item.weekly_working_hours} horas`
        )
        doc.text(20, 120, `Categoria: ${item.category}`)
        doc.text(20, 125, `Modalidade: ${item.modality}`)
        doc.text(20, 130, `Status: ${item.status}`)
        doc.text(20, 135, `Plano de Atividades: ${item.activities_plan}`)
        doc.text(20, 140, `Relatório: ${item.report}`)

        index += 1
      }

      // SAVE DOC IN PDF
      doc.save(`${student.name}.pdf`)
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
