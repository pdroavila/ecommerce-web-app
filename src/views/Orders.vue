<template>
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 m-8" >
    <div class="mx-auto max-w-screen-xl px-4  px-8">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Pedidos</h2>
        <div class="mt-6 sm:mt-8">
          <div class="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800 h-96">
            <table class="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
              <tbody class="divide-y divide-gray-200 dark:divide-gray-800 overflow-auto">

                <tr v-if="!ordersFinal.length">
                  <td>Sem pedidos realizados</td>
                </tr>
                
                <tr v-else v-for="item in ordersFinal" :key="item.id">
                  <td class="whitespace-nowrap py-4 md:w-[384px]">
                    <div class="flex items-center gap-4 justify-between	">
                      <a href="#" class="hover:underline">{{produtosFormatted(item)}}</a>
                      <p>R$ {{ item.total.toFixed(2) }}</p>
                    </div>
                  </td>
                </tr> 


              </tbody>
            </table>
          </div>

          <div class="mt-4 space-y-6">
            <div class="gap-4 sm:flex sm:items-center">
              <RouterLink to="/" class="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 text-center"> 
               Continuar comprando
              </RouterLink>
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


  var ordersFinal = ref([]);
  const toast = useToast();
  const router = useRouter();
  const authUser = localStorage.getItem('authUser');

  onMounted(async () => {
      const response = await fetch(`http://localhost:3000/api/pedidos/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser}`
          },
        });

        const orders = await response.json();

        const fetchPromises = orders.map(async (order) => {
          var produtos = JSON.parse(order.produtos) || [];
          var products = [];

          const productPromises = produtos.map(async(produto) => {
            const response = await fetch(`http://localhost:3000/api/produtos/${produto}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            })

            const result = await response.json();

            let validator = false;
            for (let i = 0; i < products.length; i++) {
              if (products[i].id === produto) {
                products[i].quantidade++;
                validator = true;
                break;
              }
            }

            if (!validator) {
              products.push({ id: produto, nome: result.nome, quantidade: 1 });
            }

          })

          await Promise.all(productPromises);

          order.produtos = products;
          ordersFinal.value.push(order);
        })

        await Promise.all(fetchPromises);
  })

  const produtosFormatted = (item) => {
    return item.produtos.map(produto => `${produto.nome} (${produto.quantidade}x)`).join(', ');
    }
</script>
