<template>
  <div>
    <header class="site-header">
      <div class="header-inner">
        <router-link to="/" class="site-title">
          <img src="/logo.png" alt="Contact Book Logo" class="site-logo" />
          Contact Book
        </router-link>
        <router-link to="/new" class="btn-new">+ New Contact</router-link>
      </div>
    </header>

    <main class="site-main">
      <router-view />
    </main>

    <footer class="site-footer">
      <p>Contact Book App &copy; 2025</p>
    </footer>
  </div>
</template>

<style scoped>
.site-header {
  background-color: #003399;
  padding: 10px 0;
}

.header-inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-title {
  color: #fff;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
}

.site-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.btn-new {
  background-color: #fff;
  color: #003399;
  padding: 6px 14px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
}

.btn-new:hover {
  background-color: #e0e0e0;
  color: #003399;
}

.site-main {
  max-width: 800px;
  margin: 24px auto;
  padding: 0 16px;
}

.site-footer {
  text-align: center;
  padding: 16px;
  font-size: 13px;
  color: #666;
  border-top: 1px solid #ccc;
  margin-top: 40px;
}
</style>
