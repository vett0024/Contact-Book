<template>
  <div>
    <p>
      <router-link :to="contact ? '/contact/' + contact.id : '/'">&larr; Back</router-link>
    </p>
    <br />

    <div v-if="!contact">
      <p>Contact not found.</p>
    </div>

    <div v-else>
      <h1>Edit Contact</h1>
      <p style="color: #666; font-size: 14px;">Editing: {{ contact.firstName }} {{ contact.lastName }}</p>
      <br />
      <ContactForm
        :initial="contact"
        submit-label="Save Changes"
        :cancel-to="'/contact/' + contact.id"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
import ContactForm from '../components/ContactForm.vue'
import { loadContact, updateContact } from '../utils/storage.js'

export default {
  name: 'EditContactView',
  components: { ContactForm },

  data() {
    return {
      contact: null,
    }
  },

  methods: {
    handleSubmit(formData) {
      updateContact(this.$route.params.id, formData)
      this.$router.push('/contact/' + this.$route.params.id)
    },
  },

  created() {
    this.contact = loadContact(this.$route.params.id)
  },
}
</script>

<style scoped>
h1 { font-size: 22px; }
</style>
