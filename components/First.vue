<template>
  <v-app>
      <v-container>
          <h1>{{ $t('greeting') }}</h1>
          <h1>Fare well.</h1>
          <h3>更新所選日期列車資訊</h3>
          <v-text-field
            v-model="setDate"
            type="date"
          ></v-text-field>
          <v-btn
            @click="getTrainInfo"
            color="deep-purple"
            dark
          >
            prepare
          </v-btn>
          <v-btn
            @click="setTrainInfo"
            color="teal"
            dark
          >
            update
          </v-btn>
      </v-container>
      <v-container>
          <v-row
            justify="space-around"
            align="center"
            class="my-3"
          >
              <h3>與官方同步</h3>
              <v-btn
                color="light-green"
                dark
                @click="findFare"
              >update fare</v-btn>
              <v-btn
                color="blue-grey"
                dark
                @click="setFares"
              >upload fare</v-btn>
              <v-btn
                color="lime"
                dark
                @click="getOneTrain"
              >OneTrain</v-btn>
              <v-btn
                color="cyan"
                dark
                @click="setOneTrains"
              >Upload OneTrain</v-btn>
          </v-row>
      </v-container>
      <v-container>
          <v-text-field
            v-model="date"
            type="date"
          >
          </v-text-field>
          <v-text-field
            v-model="depart"
            label="depart"
          >
          </v-text-field>
          <v-text-field
            v-model="arrival"
            label="arrival"
          >
          </v-text-field>
          <v-btn
            @click="getAllMes"
          >
             search
          </v-btn>
      </v-container>
      <v-container>
          <v-row>
              <v-col>
                  <v-text-field
                    v-model="searchTrainNo"
                    label="TrainNo"
                  >
                  </v-text-field>
              </v-col>
              <v-col>
                  <v-btn
                    @click="oneTrainSearch"
                  >
                      SEARCH
                  </v-btn>
              </v-col>
          </v-row>
      </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import {
  getDatabase, ref, child, get, set,
} from 'firebase/database';
import { GetAuthorizationHeader } from '~/assets/Authorization.js';

export default {
  data() {
    return {
      setDate: '',
      info: {},
      fares: {},
      oneTrains: {},
      searchItems: [
        '0803', '0609', '0813', '0125', '0829', '0141', '0845', '0853', '0861', '0295',
        '0802', '0610', '0814', '0630', '0830', '0654', '0846', '0854', '0862', '0294',
      ],
      // searchItems: ['0802'],
      date: '',
      depart: '',
      arrival: '',
      searchTrainNo: '',
      train0990: {
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1000: {
        end0990: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1010: {
        end0990: [],
        end1000: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1020: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1030: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1035: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1040: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1043: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1047: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1047: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1050: [],
        end1060: [],
        end1070: [],
      },
      train1050: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1060: [],
        end1070: [],
      },
      train1060: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1070: [],
      },
      train1070: {
        end0990: [],
        end1000: [],
        end1010: [],
        end1020: [],
        end1030: [],
        end1035: [],
        end1040: [],
        end1043: [],
        end1047: [],
        end1050: [],
        end1060: [],
      },
    };
  },
  computed: {

  },
  created() {

  },
  updated() {

  },
  methods: {
    async getTrainInfo() {
      for ( let i = 0; i < this.searchItems.length; i++ ) {
        const trainNo = this.searchItems[i];
        const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/GeneralTimetable/TrainNo/${trainNo}?%24top=30&%24format=JSON`;
        axios.get(
          url,
          { headers: GetAuthorizationHeader() },
        )
          .then( ( response ) => {
            const trainInfo = response.data[0].GeneralTimetable;
            this.setAllDate( trainInfo );
          } );
      }
      alert( 'success' );
    },
    setAllDate( trainInfo ) {
      this.info = {
        start0990: this.setTrain( trainInfo, this.train0990, '0990' ),
        start1000: this.setTrain( trainInfo, this.train1000, '1000' ),
        start1010: this.setTrain( trainInfo, this.train1010, '1010' ),
        start1020: this.setTrain( trainInfo, this.train1020, '1020' ),
        start1030: this.setTrain( trainInfo, this.train1030, '1030' ),
        start1035: this.setTrain( trainInfo, this.train1035, '1035' ),
        start1040: this.setTrain( trainInfo, this.train1040, '1040' ),
        start1043: this.setTrain( trainInfo, this.train1043, '1043' ),
        start1047: this.setTrain( trainInfo, this.train1047, '1047' ),
        start1050: this.setTrain( trainInfo, this.train1050, '1050' ),
        start1060: this.setTrain( trainInfo, this.train1060, '1060' ),
        start1070: this.setTrain( trainInfo, this.train1070, '1070' ),
      };
    },
    setTrain( trainInfo, data, value ) {
      const item = {
        DailyTrainInfo: {
          TrainNo: trainInfo.GeneralTrainInfo.TrainNo,
        },
        TrainDate: this.setDate,
        OriginStopTime: {
          DepartureTime: '',
        },
        DestinationStopTime: {
          ArrivalTime: '',
        },
      };
      let start = '';
      const stops = trainInfo.StopTimes;
      for ( let i = 0; i < stops.length; i++ ) {
        if ( stops[i].StationID === value ) {
          start = stops[i].DepartureTime;
          item.OriginStopTime.DepartureTime = start;
        }
      }
      let result = [];
      if ( trainInfo.GeneralTrainInfo.Direction === 0 ) {
        result = this.insertTrainInfo( stops, item, data, value );
      } else if ( trainInfo.GeneralTrainInfo.Direction === 1 ) {
        result = this.insertTrainInfo2( stops, item, data, value );
      }
      return result;
    },
    insertTrainInfo( stops, info, trainInfo, depart ) {
      const train = trainInfo;
      if ( info.OriginStopTime.DepartureTime !== '' ) {
        let item = {};
        let stop = {};
        for ( let i = 0; i < stops.length; i++ ) {
          item = JSON.parse( JSON.stringify( info ) );
          stop = stops[i];
          if ( stop.StationID === '1000' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1000.push( item );
          } else if ( stop.StationID === '1010' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1010.push( item );
          } else if ( stop.StationID === '1020' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1020.push( item );
          } else if ( stop.StationID === '1030' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1030.push( item );
          } else if ( stop.StationID === '1035' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1035.push( item );
          } else if ( stop.StationID === '1040' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1040.push( item );
          } else if ( stop.StationID === '1043' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1043.push( item );
          } else if ( stop.StationID === '1047' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1047.push( item );
          } else if ( stop.StationID === '1050' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1050.push( item );
          } else if ( stop.StationID === '1060' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1060.push( item );
          } else if ( stop.StationID === '1070' && stop.StationID > depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1070.push( item );
          }
        }
      }
      return train;
    },
    insertTrainInfo2( stops, info, trainInfo, depart ) {
      const train = trainInfo;
      if ( info.OriginStopTime.DepartureTime !== '' ) {
        let item = {};
        let stop = {};
        for ( let i = 0; i < stops.length; i++ ) {
          item = JSON.parse( JSON.stringify( info ) );
          stop = stops[i];
          if ( stop.StationID === '1000' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1000.push( item );
          } else if ( stop.StationID === '1010' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1010.push( item );
          } else if ( stop.StationID === '1020' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1020.push( item );
          } else if ( stop.StationID === '1030' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1030.push( item );
          } else if ( stop.StationID === '1035' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1035.push( item );
          } else if ( stop.StationID === '1040' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1040.push( item );
          } else if ( stop.StationID === '1043' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1043.push( item );
          } else if ( stop.StationID === '1047' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1047.push( item );
          } else if ( stop.StationID === '1050' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1050.push( item );
          } else if ( stop.StationID === '1060' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end1060.push( item );
          } else if ( stop.StationID === '0990' && stop.StationID < depart ) {
            item.DestinationStopTime.ArrivalTime = stop.ArrivalTime;
            train.end0990.push( item );
          }
        }
      }
      return train;
    },
    async setTrainInfo() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY',
        authDomain: 'rail-nuxt.firebaseapp.com',
        databaseURL: 'https://rail-nuxt-default-rtdb.firebaseio.com',
        projectId: 'rail-nuxt',
        storageBucket: 'rail-nuxt.appspot.com',
        messagingSenderId: '85380246039',
        appId: '1:85380246039:web:82e4bcb2bdc6ed35f5ca52',
        measurementId: 'G-4HSRY9S9HE',
      };
      const result = confirm( 'set?' );
      if ( result ) {
        const db = getDatabase( initializeApp( firebaseConfig ) );
        set( ref( db, `trainInfo/${this.setDate}` ), {
          info: this.info,
        } )
          .then( () => {
            alert( 'success' );
            location.reload();
          } )
          .catch( ( e ) => {
            alert( 'failed' );
            console.error( e );
          } );
      }
    },
    findFare() {
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare?%24format=JSON';
      axios.get(
        url,
        { headers: GetAuthorizationHeader() },
      )
        .then( ( response ) => {
          this.rebuildFare( response.data );
        } );
      alert( 'success' );
    },
    rebuildFare( priceList ) {
      const fares = {
        start0990: this.setFare( priceList, this.train0990, '0990' ),
        start1000: this.setFare( priceList, this.train1000, '1000' ),
        start1010: this.setFare( priceList, this.train1010, '1010' ),
        start1020: this.setFare( priceList, this.train1020, '1020' ),
        start1030: this.setFare( priceList, this.train1030, '1030' ),
        start1035: this.setFare( priceList, this.train1035, '1035' ),
        start1040: this.setFare( priceList, this.train1040, '1040' ),
        start1043: this.setFare( priceList, this.train1043, '1043' ),
        start1047: this.setFare( priceList, this.train1047, '1047' ),
        start1050: this.setFare( priceList, this.train1050, '1050' ),
        start1060: this.setFare( priceList, this.train1060, '1060' ),
        start1070: this.setFare( priceList, this.train1070, '1070' ),
      };
      console.log( fares );
      this.fares = fares;
    },
    setFare( priceList, data, value ) {
      const startFares = data;
      for ( let i = 0; i < priceList.length; i++ ) {
        if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '0990' ) {
          startFares.end0990 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1000' ) {
          startFares.end1000 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1010' ) {
          startFares.end1010 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1020' ) {
          startFares.end1020 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1030' ) {
          startFares.end1030 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1035' ) {
          startFares.end1035 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1040' ) {
          startFares.end1040 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1043' ) {
          startFares.end1043 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1047' ) {
          startFares.end1047 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1050' ) {
          startFares.end1050 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1060' ) {
          startFares.end1060 = JSON.parse( JSON.stringify( priceList[i] ) );
        } else if ( priceList[i].OriginStationID === value && priceList[i].DestinationStationID === '1070' ) {
          startFares.end1070 = JSON.parse( JSON.stringify( priceList[i] ) );
        }
      }
      return startFares;
    },
    async setFares() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY',
        authDomain: 'rail-nuxt.firebaseapp.com',
        databaseURL: 'https://rail-nuxt-default-rtdb.firebaseio.com',
        projectId: 'rail-nuxt',
        storageBucket: 'rail-nuxt.appspot.com',
        messagingSenderId: '85380246039',
        appId: '1:85380246039:web:82e4bcb2bdc6ed35f5ca52',
        measurementId: 'G-4HSRY9S9HE',
      };
      const result = confirm( 'set?' );
      if ( result ) {
        const db = getDatabase( initializeApp( firebaseConfig ) );
        set( ref( db, 'fares' ), {
          fare: this.fares,
        } )
          .then( () => {
            alert( 'success' );
            location.reload();
          } )
          .catch( ( e ) => {
            alert( 'failed' );
            console.error( e );
          } );
      }
    },
    async getOneTrain() {
      let train = '';
      for ( let i = 0; i < this.searchItems.length; i++ ) {
        train = this.searchItems[i];
        const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/GeneralTimetable/TrainNo/${train}?%24top=30&%24format=JSON`;
        axios.get(
          url,
          { headers: GetAuthorizationHeader() },
        )
          .then( ( response ) => {
            this.rebuildSingleTrain( response.data[0].GeneralTimetable );
          } );
      }
      console.log( this.oneTrains );
      alert( 'success' );
    },
    rebuildSingleTrain( data ) {
      const trainNo = data.GeneralTrainInfo.TrainNo;
      this.oneTrains[`No${trainNo}`] = JSON.parse( JSON.stringify( data ) );
    },
    setOneTrains() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY',
        authDomain: 'rail-nuxt.firebaseapp.com',
        databaseURL: 'https://rail-nuxt-default-rtdb.firebaseio.com',
        projectId: 'rail-nuxt',
        storageBucket: 'rail-nuxt.appspot.com',
        messagingSenderId: '85380246039',
        appId: '1:85380246039:web:82e4bcb2bdc6ed35f5ca52',
        measurementId: 'G-4HSRY9S9HE',
      };
      const result = confirm( 'set?' );
      if ( result ) {
        const db = getDatabase( initializeApp( firebaseConfig ) );
        set( ref( db, 'oneTrains' ), {
          info: this.oneTrains,
        } )
          .then( () => {
            alert( 'success' );
            location.reload();
          } )
          .catch( ( e ) => {
            alert( 'failed' );
            console.error( e );
          } );
      }
    },
    async getAllMes() {
      try {
        this.backTrainInfo = [];
        const findTrain = this.findTrain();
        const findTicket = this.findTicket();
        await Promise.all( [findTrain, findTicket] );
      } catch ( err ) {
        console.error( 'catch', err );
      }
    },
    async findTrain() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY',
        authDomain: 'rail-nuxt.firebaseapp.com',
        databaseURL: 'https://rail-nuxt-default-rtdb.firebaseio.com',
        projectId: 'rail-nuxt',
        storageBucket: 'rail-nuxt.appspot.com',
        messagingSenderId: '85380246039',
        appId: '1:85380246039:web:82e4bcb2bdc6ed35f5ca52',
        measurementId: 'G-4HSRY9S9HE',
      };
      const dbRef = ref( getDatabase( initializeApp( firebaseConfig ) ) );
      get( child( dbRef, `trainInfo/${this.date}/info/start${this.depart}/end${this.arrival}` ) )
        .then( ( snapshot ) => {
          console.log( snapshot.val() );
        } )
        .catch( ( error ) => {
          console.log( error );
          alert( '查無資訊' );
        } );
    },
    async findTicket() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY',
        authDomain: 'rail-nuxt.firebaseapp.com',
        databaseURL: 'https://rail-nuxt-default-rtdb.firebaseio.com',
        projectId: 'rail-nuxt',
        storageBucket: 'rail-nuxt.appspot.com',
        messagingSenderId: '85380246039',
        appId: '1:85380246039:web:82e4bcb2bdc6ed35f5ca52',
        measurementId: 'G-4HSRY9S9HE',
      };
      const dbRef = ref( getDatabase( initializeApp( firebaseConfig ) ) );
      get( child( dbRef, `fares/fare/start${this.depart}/end${this.arrival}` ) )
        .then( ( snapshot ) => {
          console.log( snapshot.val() );
        } )
        .catch( ( error ) => {
          console.log( error );
          alert( '查無資訊' );
        } );
    },
    async oneTrainSearch() {
      const firebaseConfig = {
        apiKey: 'AIzaSyDjAHb07_Mk-pJExz3tg04BgpB8QLHvFgY',
        authDomain: 'rail-nuxt.firebaseapp.com',
        databaseURL: 'https://rail-nuxt-default-rtdb.firebaseio.com',
        projectId: 'rail-nuxt',
        storageBucket: 'rail-nuxt.appspot.com',
        messagingSenderId: '85380246039',
        appId: '1:85380246039:web:82e4bcb2bdc6ed35f5ca52',
        measurementId: 'G-4HSRY9S9HE',
      };
      const dbRef = ref( getDatabase( initializeApp( firebaseConfig ) ) );
      get( child( dbRef, `oneTrains/info/No${this.searchTrainNo}` ) )
        .then( ( snapshot ) => {
          console.log( snapshot.val() );
        } )
        .catch( ( error ) => {
          console.log( error );
          alert( '查無資訊' );
        } );
    },
  },
};
</script>

<style>

</style>
