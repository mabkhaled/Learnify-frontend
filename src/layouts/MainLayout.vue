<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>

        <q-toolbar-title>
          <q-avatar class="q-mr-sm">
            <img src="icon.jpg" />
          </q-avatar>Learnify
        </q-toolbar-title>
        <q-btn flat  dense icon="home" label="Home" to="/" class="q-ma-md"/>
         <q-btn flat  dense icon="login" label="Login" to="/login" class="q-ma-md"/>
         <q-btn flat  dense icon="app_registration" label="Register" class="q-ma-md" to="/Register"/>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>