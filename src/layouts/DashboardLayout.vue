<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar class="q-mr-sm">
            <img src="icon.jpg" />
          </q-avatar>Learnify
        </q-toolbar-title>
        <profile-menu class="float-right"></profile-menu>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <!-- add list of links with v-for -->
      <q-list>
        <q-item-label header>Menu de Navigation</q-item-label>
        <essential-link v-for="link in links" :key="link.title" v-bind="link"></essential-link>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import EssentialLink from 'src/components/EssentialLink.vue'
import EssentialLink1 from 'src/components/EssentialLink.vue';
import ProfileMenu from '../components/ProfileMenu.vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const links = [
      {
        title: 'Notifications',
        caption: 'Consultez les notifications',
        link: '/notifications',
        icon: 'notifications',
      },
      {
        title: 'Ajouter Cours',
        caption: 'Ajouter un cours',
        link: '/add-cours',
        icon: 'add',
      },
      {
        title: 'Favoris',
        caption: 'Les cours favoris',
        link: '/favoris',
        icon: 'favorite',
      },
      {
        title: 'Messages',
        caption: 'Consultez les messages',
        link: '/messages',
        icon: 'message',
      },
      {
        title: 'Profile',
        caption: 'Consultez votre profile',
        link: '/profile',
        icon: 'person',
      },
    ];
    return {
      leftDrawerOpen,
      links,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  components: { EssentialLink, ProfileMenu }
}
</script>