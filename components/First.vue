<template>
  <div class="container">
      <div class="seatTitle">
        <h2>請選擇車位</h2>
        <div class="showStatus">
          <div class="ready">
            可選擇 <div class="canBeChoose">可</div>
            已預定 <div class="cantBeChoose">否</div>
          </div>
        </div>
      </div>
      <div class="seatChoice">
          <h3>列車車頭</h3>
          <div class="oneTrain">
              <div class="seat" v-for="(seat, index) in seats" :key="seat.index">
                    <div class="selectCar" v-if="selectedCar == index">
                        <div class="seatNum" v-for="seatNum in seat" :key="seatNum.index">
                            <label  v-if="seatNum.booked === '0' "><input type="checkbox" name="label" :value="seatNum.No" v-model="selectedSeats">
                                <span class="round button">
                                  {{seatNum.No}}
                                </span>
                            </label>
                            <label v-else><input type="checkbox" name="label" checked disabled>
                                <span class="round button">
                                  {{seatNum.No}}
                                </span>
                            </label>
                        </div>
                    </div>
              </div>
          </div>
        <div class="carNo">
            <div class="singleCar" v-for="(carNo, index) in carNos" :key="carNo.index" @click="keyInCarNo(index)">
              {{carNo}}
            </div>
        </div>
        <div class="selectedCar">
          車廂 : {{showSelectedCar}}
        </div>
      </div>
      <div class="selectedSeats">
          您選擇 
          <div class="selectedSeat" v-for="selectedSeat in selectedSeats" :key="selectedSeat.index">
              {{selectedSeat}}
          </div>
          號座位
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputData: [ 
        "A01" , "A06" , "A11" , "A16" ,
        "B01" , "B06" , "B11" , "B16" ,
        "C01" , "C06" , "C11" , "C16" ,
        "D01" , "D06" , "D11" , "D16" ,
        "E01" , "E06" , "E11" , "E16" ,
        "F01" , "F06" , "F11" , "F16" ,
        "G01" , "G06" , "G11" , "G16" ,
        "H01" , "H06" , "H11" , "H16" ,
        "I01" , "I06" , "I11" , "I16" ,
        "J01" , "J06" , "J11" , "J16" ,
        ],
      seats: [
        [
          { No: "A01" , booked: "0" } , { No: "A02" , booked: "0" } , { No: "A03" , booked: "0" } , { No: "A04" , booked: "0" } , { No: "A05" , booked: "0" } ,
          { No: "A06" , booked: "0" } , { No: "A07" , booked: "0" } , { No: "A08" , booked: "0" } , { No: "A09" , booked: "0" } , { No: "A10" , booked: "0" } ,
          { No: "A11" , booked: "0" } , { No: "A12" , booked: "0" } , { No: "A13" , booked: "0" } , { No: "A15" , booked: "0" } , { No: "A15" , booked: "0" } ,
          { No: "A16" , booked: "0" } , { No: "A17" , booked: "0" } , { No: "A18" , booked: "0" } , { No: "A19" , booked: "0" } , { No: "A20" , booked: "0" } , 
        ],
        [
          { No: "B01" , booked: "0" } , { No: "B02" , booked: "0" } , { No: "B03" , booked: "0" } , { No: "B04" , booked: "0" } , { No: "B05" , booked: "0" } ,
          { No: "B06" , booked: "0" } , { No: "B07" , booked: "0" } , { No: "B08" , booked: "0" } , { No: "B09" , booked: "0" } , { No: "B10" , booked: "0" } ,
          { No: "B11" , booked: "0" } , { No: "B12" , booked: "0" } , { No: "B13" , booked: "0" } , { No: "B15" , booked: "0" } , { No: "B15" , booked: "0" } ,
          { No: "B16" , booked: "0" } , { No: "B17" , booked: "0" } , { No: "B18" , booked: "0" } , { No: "B19" , booked: "0" } , { No: "B20" , booked: "0" } , 
        ],
        [
          { No: "C01" , booked: "0" } , { No: "C02" , booked: "0" } , { No: "C03" , booked: "0" } , { No: "C04" , booked: "0" } , { No: "C05" , booked: "0" } ,
          { No: "C06" , booked: "0" } , { No: "C07" , booked: "0" } , { No: "C08" , booked: "0" } , { No: "C09" , booked: "0" } , { No: "C10" , booked: "0" } ,
          { No: "C11" , booked: "0" } , { No: "C12" , booked: "0" } , { No: "C13" , booked: "0" } , { No: "C15" , booked: "0" } , { No: "C15" , booked: "0" } ,
          { No: "C16" , booked: "0" } , { No: "C17" , booked: "0" } , { No: "C18" , booked: "0" } , { No: "C19" , booked: "0" } , { No: "C20" , booked: "0" } , 
        ],
        [
          { No: "D01" , booked: "0" } , { No: "D02" , booked: "0" } , { No: "D03" , booked: "0" } , { No: "D04" , booked: "0" } , { No: "D05" , booked: "0" } ,
          { No: "D06" , booked: "0" } , { No: "D07" , booked: "0" } , { No: "D08" , booked: "0" } , { No: "D09" , booked: "0" } , { No: "D10" , booked: "0" } ,
          { No: "D11" , booked: "0" } , { No: "D12" , booked: "0" } , { No: "D13" , booked: "0" } , { No: "D15" , booked: "0" } , { No: "D15" , booked: "0" } ,
          { No: "D16" , booked: "0" } , { No: "D17" , booked: "0" } , { No: "D18" , booked: "0" } , { No: "D19" , booked: "0" } , { No: "D20" , booked: "0" } , 
        ],
        [
          { No: "E01" , booked: "0" } , { No: "E02" , booked: "0" } , { No: "E03" , booked: "0" } , { No: "E04" , booked: "0" } , { No: "E05" , booked: "0" } ,
          { No: "E06" , booked: "0" } , { No: "E07" , booked: "0" } , { No: "E08" , booked: "0" } , { No: "E09" , booked: "0" } , { No: "E10" , booked: "0" } ,
          { No: "E11" , booked: "0" } , { No: "E12" , booked: "0" } , { No: "E13" , booked: "0" } , { No: "E15" , booked: "0" } , { No: "E15" , booked: "0" } ,
          { No: "E16" , booked: "0" } , { No: "E17" , booked: "0" } , { No: "E18" , booked: "0" } , { No: "E19" , booked: "0" } , { No: "E20" , booked: "0" } , 
        ],
        [
          { No: "F01" , booked: "0" } , { No: "F02" , booked: "0" } , { No: "F03" , booked: "0" } , { No: "F04" , booked: "0" } , { No: "F05" , booked: "0" } ,
          { No: "F06" , booked: "0" } , { No: "F07" , booked: "0" } , { No: "F08" , booked: "0" } , { No: "F09" , booked: "0" } , { No: "F10" , booked: "0" } ,
          { No: "F11" , booked: "0" } , { No: "F12" , booked: "0" } , { No: "F13" , booked: "0" } , { No: "F15" , booked: "0" } , { No: "F15" , booked: "0" } ,
          { No: "F16" , booked: "0" } , { No: "F17" , booked: "0" } , { No: "F18" , booked: "0" } , { No: "F19" , booked: "0" } , { No: "F20" , booked: "0" } , 
        ],
        [
          { No: "G01" , booked: "0" } , { No: "G02" , booked: "0" } , { No: "G03" , booked: "0" } , { No: "G04" , booked: "0" } , { No: "G05" , booked: "0" } ,
          { No: "G06" , booked: "0" } , { No: "G07" , booked: "0" } , { No: "G08" , booked: "0" } , { No: "G09" , booked: "0" } , { No: "G10" , booked: "0" } ,
          { No: "G11" , booked: "0" } , { No: "G12" , booked: "0" } , { No: "G13" , booked: "0" } , { No: "G15" , booked: "0" } , { No: "G15" , booked: "0" } ,
          { No: "G16" , booked: "0" } , { No: "G17" , booked: "0" } , { No: "G18" , booked: "0" } , { No: "G19" , booked: "0" } , { No: "G20" , booked: "0" } , 
        ],
        [
          { No: "H01" , booked: "0" } , { No: "H02" , booked: "0" } , { No: "H03" , booked: "0" } , { No: "H04" , booked: "0" } , { No: "H05" , booked: "0" } ,
          { No: "H06" , booked: "0" } , { No: "H07" , booked: "0" } , { No: "H08" , booked: "0" } , { No: "H09" , booked: "0" } , { No: "H10" , booked: "0" } ,
          { No: "H11" , booked: "0" } , { No: "H12" , booked: "0" } , { No: "H13" , booked: "0" } , { No: "H15" , booked: "0" } , { No: "H15" , booked: "0" } ,
          { No: "H16" , booked: "0" } , { No: "H17" , booked: "0" } , { No: "H18" , booked: "0" } , { No: "H19" , booked: "0" } , { No: "H20" , booked: "0" } , 
        ],
        [
          { No: "I01" , booked: "0" } , { No: "I02" , booked: "0" } , { No: "I03" , booked: "0" } , { No: "I04" , booked: "0" } , { No: "I05" , booked: "0" } ,
          { No: "I06" , booked: "0" } , { No: "I07" , booked: "0" } , { No: "I08" , booked: "0" } , { No: "I09" , booked: "0" } , { No: "I10" , booked: "0" } ,
          { No: "I11" , booked: "0" } , { No: "I12" , booked: "0" } , { No: "I13" , booked: "0" } , { No: "I15" , booked: "0" } , { No: "I15" , booked: "0" } ,
          { No: "I16" , booked: "0" } , { No: "I17" , booked: "0" } , { No: "I18" , booked: "0" } , { No: "I19" , booked: "0" } , { No: "I20" , booked: "0" } , 
        ],
        [
          { No: "J01" , booked: "0" } , { No: "J02" , booked: "0" } , { No: "J03" , booked: "0" } , { No: "J04" , booked: "0" } , { No: "J05" , booked: "0" } ,
          { No: "J06" , booked: "0" } , { No: "J07" , booked: "0" } , { No: "J08" , booked: "0" } , { No: "J09" , booked: "0" } , { No: "J10" , booked: "0" } ,
          { No: "J11" , booked: "0" } , { No: "J12" , booked: "0" } , { No: "J13" , booked: "0" } , { No: "J15" , booked: "0" } , { No: "J15" , booked: "0" } ,
          { No: "J16" , booked: "0" } , { No: "J17" , booked: "0" } , { No: "J18" , booked: "0" } , { No: "J19" , booked: "0" } , { No: "J20" , booked: "0" } , 
        ],
      ],
      carNos: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      selectedCar: "0",
      showSelectedCar: "A",
      selectedSeats:[],
    }
  },
  created() {
    this.refreshTable();
  },
  updated() {
    if(this.selectedSeats.length > 3){
      this.selectedSeats.pop();
    }

    this.showSelectedCar = this.carNos[this.selectedCar]
  },
  methods:{
    keyInCarNo(index){
      this.selectedCar = index;
    },
    refreshTable() {
      const input = this.inputData;
      const seats = this.seats;
      for (let i = 0 ; i < input.length ; i++ ){
        for (let j = 0 ; j < seats.length ; j++ ){
          let seat = seats[j];
          for ( let k = 0 ; k < seat.length ; k++){
            if ( seat[k].No === input[i] ) {
              seat[k].booked = "1";
            }
          }
        }
      }
    },
  },
}
</script>

<style>
  .seatTitle{
    text-align: center;
  }
  .seatTitle .canBeChoose{
    display: inline-block;
    background: #8ecbcf;
    color: #8ecbcf;
  }
  .seatTitle .cantBeChoose{
    display: inline-block;
    background: #5e7380;
    color: #5e7380;
  }
  .seatChoice{
    margin: 5% auto;
    padding: 3% auto;
    width: 70%;
    border: 2px solid #ccc;
    text-align: center;
  }
  .seatChoice h3{
    display: inline-block;
    margin: 2% 0 0 0;
  }
  .oneTrain{
    margin: 3% auto;
  }
  .selectCar{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .seatNum{
    margin: 3% 2%;
    height: 6vh;
    width: 15%;
  }
  .selectCar :nth-child(2){
    margin-right: 12%;
  }
  .selectCar :nth-child(6){
    margin-right: 12%;
  }
  .selectCar :nth-child(10){
    margin-right: 12%;
  }
  .selectCar :nth-child(14){
    margin-right: 12%;
  }
  .selectCar :nth-child(18){
    margin-right: 12%;
  }
  .oneTrain input[type="checkbox"] {
    display: none; 
  }
  .oneTrain input:checked + .button {
    background: #5e7380; 
    color: #fff;
  }
  .oneTrain .button {
    display: inline-block;
    transform: translateX(-33%);
    background: #8ecbcf;
    height: 8vh;
    width: 8vh; 
    color: #333; 
    cursor: pointer;
    line-height: 8vh;
  }
  .oneTrain .button:hover {
    background: #8ecbcf7c; 
  }
  .oneTrain .round {
    border-radius: 5px; 
  }
  .carNo{
    margin: 2% 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .singleCar{
    margin: 0 2%;
    height: 100%;
    width: 4%;
    font-size: normal;
    cursor: pointer;
    color: rgb(0, 0, 0);
    transition: 0.2s ease all;
  }
  .singleCar:hover{
    color: rgb(224, 228, 235);
    background: rgb(122, 173, 231);
    border-radius: 25%;
  }
  .selectedSeats{
    margin: 2% 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .selectedSeat{
    margin: 0 2%;
  }
</style>
