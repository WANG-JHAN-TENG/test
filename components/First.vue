<template>
  <v-app>
    <!-- <div class="container">
        <v-select v-model="numtest" :items="nums"></v-select>{{ typeof nums[0] }}
        
        {{ typeof numtest}}
        <v-btn color="primary" @click="showDate">按按看2</v-btn>
        <div class="btn btn-dark" @click="findBookingInfo">按按看</div>
          <div class="userContainer row" v-if="usersIds">
            <div class="users col-2" v-for="(usersId, key) in usersIds" :key="usersId.index">
              <div class="user" @click="findPerUser(key , usersId )">
              訂票人<span> {{key}}</span>
                <div class="phone" v-for=" (info , key ) in usersId" :key="info.index">
                  電話<span> {{key}}</span>
                </div>
              </div>
          </div>
        </div>
      </div> -->
      <main>
        <h1>{{ $t('greeting') }}</h1>
        <h1>Fare well.</h1>
      </main>
  </v-app>
</template>

<script>
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, child, get, remove, update, set} from "firebase/database";
export default {
  data() {
    return {
    //   usersIds: [],
    //   one: "",
    //   two: "",
    }
  },
  computed: {

  },
  created() {

  },
  updated() {

  },
  methods:{
		// findBookingInfo() {
    //   const firebaseConfig = {
    //     apiKey: "AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY",
    //     authDomain: "rail-nuxt.firebaseapp.com",
    //     databaseURL: "https://rail-nuxt-default-rtdb.firebaseio.com",
    //     projectId: "rail-nuxt",
    //     storageBucket: "rail-nuxt.appspot.com",
    //     messagingSenderId: "85380246039",
    //     appId: "1:85380246039:web:82e4bcb2bdc6ed35f5ca52",
    //     measurementId: "G-4HSRY9S9HE"
    //   };
		// 	const dbRef = ref( getDatabase( initializeApp(firebaseConfig) ) );
		// 	get( child( dbRef, `users/` ) )
		// 	.then( ( snapshot ) => {
		// 		if ( snapshot.exists() ) {
    //       console.log(snapshot.val());
    //       this.usersIds = snapshot.val();
		// 		} else {
		// 			alert("查無資訊");
		// 		}
		// 	})
		// 	.catch( (error) => {
		// 		console.log(error);
		// 		alert("查無資訊");
		// 	});
		// },
    // findPerUser(key ,usersId) {
    //   const firebaseConfig = {
    //     apiKey: "AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY",
    //     authDomain: "rail-nuxt.firebaseapp.com",
    //     databaseURL: "https://rail-nuxt-default-rtdb.firebaseio.com",
    //     projectId: "rail-nuxt",
    //     storageBucket: "rail-nuxt.appspot.com",
    //     messagingSenderId: "85380246039",
    //     appId: "1:85380246039:web:82e4bcb2bdc6ed35f5ca52",
    //     measurementId: "G-4HSRY9S9HE"
    //   };
    //   const userId = key;
    //   const phoneNum = Object.keys(usersId).toString();
    //   this.one = key;
    //   this.two = Object.keys(usersId).toString();
		// 	const dbRef = ref( getDatabase( initializeApp(firebaseConfig) ) );
		// 	get( child( dbRef, `users/${userId}/${phoneNum}` ) )
		// 	.then( ( snapshot ) => {
		// 		if ( snapshot.exists() ) {
    //       console.log(snapshot.val());
    //       this.usersIds = snapshot.val();
		// 		} else {
		// 			alert("查無資訊");
		// 		}
		// 	})
		// 	.catch( (error) => {
		// 		console.log(error);
		// 		alert("查無資訊");
		// 	});
    // },
    
  },
}
</script>

<style>

</style>
