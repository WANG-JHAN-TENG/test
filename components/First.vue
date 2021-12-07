<template>
  <div class="container">
    <button @click="writeUserData">add</button>
    <button @click="getData">get</button>
  </div>
</template>

<script>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY",
  authDomain: "rail-nuxt.firebaseapp.com",
  databaseURL: "https://rail-nuxt-default-rtdb.firebaseio.com",
  projectId: "rail-nuxt",
  storageBucket: "rail-nuxt.appspot.com",
  messagingSenderId: "85380246039",
  appId: "1:85380246039:web:82e4bcb2bdc6ed35f5ca52",
  measurementId: "G-4HSRY9S9HE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

export default {
  data() {
    return {
      userId:"0001",
      startStation:"台北",
      endStation:"台中",
      carType:"0",
      date : "2021-12-03",
      trainNo : "1516",
      departTime : "08:00",
      arrivalTime : "09:00",
      ticketCount : {
        adult : 1,
        kid : 0,
        love : 0,
        older : 0,
        student : 0,
      },
    }
  },
  methods:{
    writeUserData() {
      const db = getDatabase(app);
      set(ref(db, 'users/' + this.userId + "/onbord"), {
        startStation: this.startStation,
        endStation: this.endStation,
        carType : this.carType,
        date : this.date,
        trainNo : this.trainNo,
        departTime : this.departTime,
        arrivalTime : this.arrivalTime,
        ticketCount : this.ticketCount,
      });
    },
    getData(){
      const dbRef = ref(getDatabase(app));
      let userId = "0001";
      get(child(dbRef, `users/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  },
}
</script>

<style>

</style>
