<template>
  <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 m-8" >
    <div class="mx-auto max-w-screen-xl px-4  px-8">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Carrinho</h2>
        <div class="mt-6 sm:mt-8">
          <div class="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800 h-96">
            <table class="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800 overflow-auto">

                <tr v-if="!items.length">
                  <td>Sem produtos no carrinho</td>
                </tr>
                
                <tr v-else v-for="item in items" :key="item.id">
                  <td class="whitespace-nowrap py-4 md:w-[384px]">
                    <div class="flex items-center gap-4">
                      <a href="#" class="block aspect-square w-10 shrink-0">
                        <img :src="item.imagem" :alt="item.nome" class="h-full w-full object-cover object-center group-hover:opacity-75 cursor-pointer" />
                      </a>
                      <a href="#" class="hover:underline">{{item.nome}}</a>
                    </div>
                  </td>

                  <td class="p-4 text-base font-normal text-gray-900 dark:text-white">x1</td>

                  <td class="p-4 text-right text-base font-bold text-gray-900 dark:text-white">R$ {{ item.valor.toFixed(2) }}</td>
                </tr>


              </tbody>
            </table>
          </div>

          <div class="mt-4 space-y-6">
            <div class="space-y-4">
              <dl class="flex items-center justify-between gap-4 ">
                <dt class="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                <dd class="text-lg font-bold text-gray-900 dark:text-white">R$ {{ calcTotals().toFixed(2) }}</dd>
              </dl>
            </div>
            <div class="gap-4 sm:flex sm:items-center">
              <RouterLink to="/" class="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 text-center"> 
               Continuar comprando
              </RouterLink>
              <button type="submit" class="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0" @click="order()">Fazer o Pedido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup>
  import { RouterLink } from 'vue-router'
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification'


  var items = ref([]);
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const toast = useToast();
  const router = useRouter();

  onMounted(async () => {
    const fetchPromises = cartItems.map(async (item) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/produtos/${item}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        items.value.push(data);
      } catch (error) {
        console.error('Erro ao buscar o produto: ', error);
      }
    });

    await Promise.all(fetchPromises);
  })

  const calcTotals = () => {
    return items.value.reduce((total, item) => total + item.valor, 0);
  }

  const order = async () => {

    if(!cartItems.length)
      return toast.error("Sem produtos no carrinho.");

    let data = {
      cartItems,
      total: calcTotals()
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pedidos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authUser')}`
        },
        body: JSON.stringify(data)
      });

      await response.json();

      if(response.status !== 201)
        return toast.error("Ocorreu um erro ao processar o pedido.");
      
      toast.success("Pedido realizado com sucesso.");
      localStorage.removeItem('cartItems');
      return router.push({name : 'pedidos'});

    } catch (error) {
      console.error('Erro ao buscar o produto:', error);
    }

    console.log(data)
  }
</script>
