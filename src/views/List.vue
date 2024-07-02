<template>
  <div style="height: calc(100vh - 64px);" class="flex items-center flex-col justify-center gap-5">
    <div v-if="isAdmin" class="m-8">
      <RouterLink to="/produtos/cadastro" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Cadastrar Produto
      </RouterLink>
    </div>
    <div v-if="!produtos.length">
      <h1>Não temos produtos cadastrados :(</h1>
    </div>
    <div v-else class="bg-neutral-800	overflow-auto m-2">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
          <a v-for="product in produtos" :key="product.id"  class="group">
            <RouterLink :to="`/produtos/${product.id}`" >
              <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 h-80">
                <img :src="product.imagem" :alt="product.nome" class="h-full w-full object-cover object-center group-hover:opacity-75 cursor-pointer" />
              </div>
            </RouterLink>
            <h3 class="mt-4 text-sm text-white">{{ product.nome }}</h3>
            <p class="mt-1 text-lg font-medium text-slate-50	">R$ {{ parseFloat(product.valor).toFixed(2) }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import { onMounted, ref } from 'vue';

  var produtos = ref([]);
  var isAdmin = ref();

  onMounted(async () => {
    const isAdminValue = localStorage.getItem('isAdm');
    isAdmin.value = isAdminValue ? JSON.parse(isAdminValue) : false;
    
    let response = await fetch('http://localhost:3000/api/produtos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    produtos.value = await response.json(); 
  })
</script>
