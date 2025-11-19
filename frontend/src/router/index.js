import { createRouter, createWebHistory } from 'vue-router'
import Indeks from '@/views/Indeks.vue'
import Beranda from '@/views/BerandaSection/Beranda.vue'
import Tentang from '@/views/AboutSection/Tentang.vue'
import CariSpot from '@/views/SpotSection/CariSpot.vue'
import Peralatan from '@/views/PerlengkapanSection/Peralatan.vue'
import Umpan from '@/views/PerlengkapanSection/Umpan.vue'
import Signin from '@/views/AuthSection/signIn.vue'
import signUp from '@/views/AuthSection/signUp.vue'
import Profile from '@/views/ProfilSection/Profile.vue'
import DetailSpot from '@/views/SpotSection/DetailSpot.vue'
import BookingPage from '@/views/BookingSection/BookingPage.vue'
import BlogDetail from '@/views/BerandaSection/BlogDetail.vue'
import PaymentPage from '@/views/PaymentSection/PaymentPage.vue'
import AddReview from '@/views/SpotSection/AddReview.vue'
const routes = [
  { path: '/', name: 'Indeks', component: Indeks },
  { path: '/Beranda', name: 'Beranda', component: Beranda },
  { path: '/tentang', name: 'Tentang', component: Tentang, meta: { title: 'Tentang | Mancingku' } },
  { path: '/spot', name: 'CariSpot', component: CariSpot, meta: { title: 'Cari Spot | Mancingku' } },
  { path: '/peralatan', name: 'Peralatan', component: Peralatan, meta: { title: 'Peralatan | Mancingku' } },
  { path: '/umpan', name: 'Umpan', component: Umpan, meta: { title: 'Umpan | Mancingku' } },
  { path: '/spot/:slug', name: 'DetailSpot', component: () => import('../views/SpotSection/DetailSpot.vue') },
  { path: '/comment/:id', name: 'CommentPage', component: () => import('@/views/SpotSection/CommentPage.vue'), meta: { title: 'Ulasan | Mancingku' } },
  { path: '/signIn', name: 'signIn', component: Signin, meta: { title: 'Masuk | Mancingku' } },
  { path: '/signUp', name: 'signUp', component: signUp, meta: { title: 'Daftar | Mancingku' } },
  { path: '/Profile', name: 'Profile', component: Profile, meta: { title: 'Profil | Mancingku' } },
  { path: '/BookingPage/:slug', name: 'BookingPage', component: BookingPage, meta: { title: 'Booking | Mancingku' } },
  { path: '/blog/:slug', name: 'BlogDetail', component: BlogDetail, meta: { title: 'Artikel | Mancingku' } },
  { path: '/payment/:slug', name: 'PaymentPage', component: () => import('@/views/PaymentSection/PaymentPage.vue'), meta: { title: 'Pembayaran | Mancingku' } },
  { path: '/comment/add/:id', name: 'AddReview', component: AddReview, meta: { title: 'Tambah Ulasan | Mancingku' } },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // selalu scroll ke atas tiap ganti halaman
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const defaultTitle = 'Mancingku';
  document.title = to.meta.title || defaultTitle;
});

export default router
