<template>
  <div class="flex items-center " style="height: calc(100vh - 64px);" v-if="produto">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 antialiased dark:bg-gray-900 py-8 bg-white md:py-16 ">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16 p-8">
        <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 w-80 h-80" >
            <img :src="produto.imagem" :alt="produto.nome" class="h-full w-full object-cover object-center group-hover:opacity-75 cursor-pointer" />
        </div>

        <div class="mt-6 sm:mt-8 lg:mt-0">
          <h1
            class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white" 
          >
            {{produto.nome}}
          </h1>
          <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p
              class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white" 
            >
              R$ {{produto.valor.toFixed(2)}}
            </p>
          </div>

          <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            <a
              href="#"
              title=""
              class="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
              role="button"
              @click="addCart()"
            >
              <svg
                class="w-5 h-5 -ms-2 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
              </svg>

              Adicionar no carrinho
            </a>
          </div>

          <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p class="mb-6 text-gray-500 dark:text-gray-400" >
            {{ produto.descricao }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'

const produto = ref(null);
const productId = ref(null);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  productId.value = route.params.id;
  
  try {
    const response = await fetch(`http://localhost:3000/api/produtos/${productId.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    produto.value = data;
  } catch (error) {
    console.error('Erro ao buscar o produto:', error);
  }
});

const addCart = () => {
  const toast = useToast();

  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(productId.value);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  toast.success("Adicionado ao carrinho.");

  setTimeout(() => {
    router.push({name : 'carrinho'});
  }, 1000);
};


</script>

