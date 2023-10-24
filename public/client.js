console.log("Iniciando o aplicativo Firebase...");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

console.log("Módulos Firebase importados com sucesso!");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABceDMCup6Z1LmclNegasDGLMKAYmOk-0",
  authDomain: "clima-a12f5.firebaseapp.com",
  projectId: "clima-a12f5",
  storageBucket: "clima-a12f5.appspot.com",
  messagingSenderId: "234130570534",
  appId: "1:234130570534:web:b8851322d6e9a236b5d5e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase inicializado com sucesso!");

const db = getFirestore(app);

// Selecionar o botão de e-mail e o campo de entrada de e-mail
const botaoEmail = document.getElementById('botao-email');
const emailInput = document.getElementById('input-email');
const resultado = document.getElementById('resultado');

// selecionar o alerta climática
const alerta = document.getElementById('alertsPrevisao');

botaoEmail.addEventListener('click', async function () {
  // Obter o valor do campo de entrada de e-mail
  const email = emailInput.value;

  function verificarEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }

  // Verificar se o e-mail não está vazio
  if (email.trim() !== '') {
    if (verificarEmail(email)) {
    try {
      // Adicionar o e-mail ao Firestore
      const docRef = await addDoc(collection(db, 'email'), {
        email: email,
      });

      // Trocar a imagem do botão para o ícone de sucesso
      const botaoEmailIcon = document.querySelector('#botao-icon');
      botaoEmailIcon.src = './assets/sucesso.svg';
      const backBotao = document.querySelector('#botao-email');
      backBotao.style.backgroundColor = '#008000';

      console.log('E-mail adicionado com sucesso com ID: ', docRef.id);

      // Limpar o campo de entrada após a adição do e-mail
      emailInput.value = '';
      // Aguardar por alguns segundos antes de restaurar a imagem original do botão
      setTimeout(function () {
        botaoEmailIcon.src = './assets/botao-enviar.png';
        backBotao.style.backgroundColor = '#393939';

        const valorPadrao = 'digite seu e-mail';
        
          // Se o campo estiver vazio, redefina o valor padrão
          if (emailInput.value === '') {
            emailInput.value = valorPadrao;
          }
      }, 3000); // 3000 milissegundos (3 segundos)



    } catch (error) {
      console.error('Erro ao adicionar o e-mail: ', error);
    }
  } else {
    resultado.style.display ='flex';
    resultado.innerHTML = 'E-mail inválido. Por favor, insira um e-mail válido.';
    setTimeout(function () {
      resultado.style.display = 'none';
    }, 3000);
  }
  }else {
    console.log('Campo de e-mail vazio. Nenhum e-mail adicionado.');
  }
});

if (alerta.trim() !== '') {
  try {
    // Adicionar o e-mail ao Firestore
    const docAlerta = await addDoc(collection(db, 'alertas'), {
      alerta: alerta,
    });
    console.log('Alerta adicionado com sucesso com ID: ', docAlerta.id);

  }catch (error) {
    console.error('Erro ao adicionar o Alerta: ', error);
  }
}