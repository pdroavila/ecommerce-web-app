import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import List from '../views/List.vue'
import Produtos from '../views/cadastro/Produtos.vue'
import Produto from '../views/Product.vue'
import Carrinho from '../views/Cart.vue'
import Pedidos from '../views/Orders.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: List
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/produtos/cadastro',
      name: 'produtosCadastro',
      component: Produtos
    },
    {
      path: '/produtos/:id',
      name: 'produto',
      component: Produto
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: Carrinho
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: Pedidos
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authUser = localStorage.getItem('authUser');
  
  if (to.name !== "login" && !authUser) {
    next({ name: 'login' });
    return;
  }

  if (to.name !== "login") {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios/buscar/hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authUser}`},
      });

      if (response.status !== 200) {
        localStorage.removeItem('authUser');
        next({ name: 'login' });
        return;
      }

      let retorno = await response.json();

      localStorage.setItem('isAdm', retorno.admin)

    } catch (error) {
      console.error('Erro ao buscar hash do usuário:', error);
      next(false);
      return;
    }
  }

  next();
});


export default router
