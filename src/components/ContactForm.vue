<template>
  <form @submit.prevent="handleSubmit">

    <table class="form-table">
      <tbody>
        <tr>
          <td><label for="firstName">First Name *</label></td>
          <td>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="Jane"
              @blur="validateField('firstName')"
            />
            <span v-if="errors.firstName" class="error">{{ errors.firstName }}</span>
          </td>
        </tr>
        <tr>
          <td><label for="lastName">Last Name *</label></td>
          <td>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Smith"
              @blur="validateField('lastName')"
            />
            <span v-if="errors.lastName" class="error">{{ errors.lastName }}</span>
          </td>
        </tr>
        <tr>
          <td><label for="email">Email *</label></td>
          <td>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="jane@example.com"
              @blur="validateField('email')"
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </td>
        </tr>
        <tr>
          <td><label for="phone">Phone</label></td>
          <td>
            <input id="phone" v-model="form.phone" type="tel" placeholder="555-0100" />
          </td>
        </tr>
        <tr>
          <td><label for="address">Address</label></td>
          <td>
            <input id="address" v-model="form.address" type="text" placeholder="123 Main St" />
          </td>
        </tr>
        <tr>
          <td><label for="notes">Notes</label></td>
          <td>
            <textarea id="notes" v-model="form.notes" placeholder="Any extra details..."></textarea>
          </td>
        </tr>
      </tbody>
    </table>

    <br />

    <button type="submit" class="btn-submit">{{ submitLabel }}</button>
    &nbsp;
    <router-link :to="cancelTo">Cancel</router-link>

  </form>
</template>

<script>
export default {
  name: 'ContactForm',

  props: {
    initial: {
      type: Object,
      default: () => ({}),
    },
    submitLabel: {
      type: String,
      default: 'Save',
    },
    cancelTo: {
      type: String,
      default: '/',
    },
  },

  emits: ['submit'],

  data() {
    return {
      form: {
        firstName: this.initial.firstName || '',
        lastName:  this.initial.lastName  || '',
        email:     this.initial.email     || '',
        phone:     this.initial.phone     || '',
        address:   this.initial.address   || '',
        notes:     this.initial.notes     || '',
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
      },
    }
  },

  methods: {
    validateField(field) {
      if (field === 'firstName') {
        this.errors.firstName = this.form.firstName.trim() ? '' : 'First name is required.'
      }
      if (field === 'lastName') {
        this.errors.lastName = this.form.lastName.trim() ? '' : 'Last name is required.'
      }
      if (field === 'email') {
        if (!this.form.email.trim()) {
          this.errors.email = 'Email is required.'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
          this.errors.email = 'Please enter a valid email.'
        } else {
          this.errors.email = ''
        }
      }
    },

    validateAll() {
      this.validateField('firstName')
      this.validateField('lastName')
      this.validateField('email')
      return !this.errors.firstName && !this.errors.lastName && !this.errors.email
    },

    handleSubmit() {
      if (!this.validateAll()) return
      this.$emit('submit', { ...this.form })
    },
  },
}
</script>

<style scoped>
.form-table {
  border-collapse: collapse;
  width: 100%;
  max-width: 500px;
}

.form-table td {
  padding: 8px 10px;
  vertical-align: top;
}

.form-table td:first-child {
  width: 110px;
  font-weight: bold;
  padding-top: 10px;
  font-size: 14px;
}

.error {
  display: block;
  color: #cc0000;
  font-size: 13px;
  margin-top: 3px;
}

.btn-submit {
  background-color: #003399;
  color: #fff;
  padding: 7px 18px;
  border-radius: 3px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0044bb;
}
</style>
