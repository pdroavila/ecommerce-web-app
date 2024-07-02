<template>
  <div style="height: calc(100vh - 64px);" class="flex items-center">
      <form class="max-w-md mx-auto ">
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 w-full mb-5 group">
                <input type="text" name="floating_Nome" v-model="form.nome" id="floating_Nome" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_Nome" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome</label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input type="number" id="floating_valor" v-model="form.valor" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="floating_valor" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Valor</label>
            </div>
          </div>
        <div class="relative z-0 w-full mb-5 group">
          <textarea id="descricao" rows="4"  v-model="form.descricao" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descrição..." required></textarea>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Foto do produto</label>
          <input @change="onFileChange" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" accept="image/png, image/jpeg" required>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="cadastrar">
          Cadastrar
        </button>
      </form>
  </div>
</template>

<script>
  import { useToast } from 'vue-toastification'
  export default {
    data() {
      return {
        form: {
            nome: "",
            valor: "",
            descricao: ""
          }
      };
    },
    methods: {
      async cadastrar(e) {
        e.preventDefault();

        let data = {
          "base64Image": this.image,
          "nome": this.form.nome,
          "valor": this.form.valor,
          "descricao": this.form.descricao
        }
        
        let response = await fetch('http://localhost:3000/api/produtos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authUser')}`
            },
            body: JSON.stringify(data)
          });

          const toast = useToast()
          this.clearForm();

          if(response.status !== 201)
            return toast.error('Erro interno!')
          
          return toast.success('Produto cadastrado com sucesso!')
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      clearForm() {
        this.form = {
          email: "",
          password: ""
        }
      },
    }
  };
</script>