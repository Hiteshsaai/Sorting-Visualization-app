import React, {Component} from 'react';
import classes from './SortingVisualization.module.css';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'
import * as sortingAlgorithm from '../SortingAlgorithm/SortingAlgorithm';


function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
  }  


  const ANIMATION_SPEED_MS = 25;

  // Change this value for the number of bars (value) in the array.
  // const NUMBER_OF_ARRAY_BARS = 310;
  
  // This is the main color of the array bars.
  // const PRIMARY_COLOR = '#162447' //'#01BFFF'; 
  
  // This is the color of array bars that are being compared throughout the animations.
  // const SECONDARY_COLOR = '#2DF009'/*'turquoise';*/ 
  

class SortingVisualization extends Component {
    state ={
        data: [],
        value: 5,
        curValue: 5,
        barcolor: '#162447'
    }

    componentDidMount(){
        this.resetArray();
    }
    
    resetArray(){
        const Newdata = [];
        const value = this.state.curValue;
        for (let i = 0; i<value; i++){
            Newdata.push(randomNumber(10, 800))
        }

        this.setState({value:value, data:Newdata, barcolor: '#162447'})
    }

    
    handleChangeStart = () =>{
        console.log('Change event Started')
    };

    handleChange = value => {
        this.setState({curValue:value})
    };

    handleChangeComplete = () => {
        console.log('Change event completed')
      };


    mergeSort(){
        const animations = sortingAlgorithm.getMergeSortAnimations(this.state.data);
        // console.log(animations[0])
        console.log(animations.length)
          for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName(classes.arrayBar);
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
              const [barOneIdx, barTwoIdx] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              setTimeout(() => {
                barOneStyle.backgroundColor = '#01BFFF' ;
                barTwoStyle.backgroundColor = '#01BFFF' ;
              }, i * ANIMATION_SPEED_MS);
            } else {
              setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * ANIMATION_SPEED_MS);
            }
          }
      }
    
    

    quickSort(){
      const animations= sortingAlgorithm.quickSort(this.state.data);
      for (let i = 0 ; i< animations.length; i++){
        const arrayBars = document.getElementsByClassName(classes.arrayBar);
        const[barOneIdx, barTwoIdx, condition, pivot, OneValue, TwoValue] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const pivotStyle = arrayBars[pivot].style;
        if (condition){
          setTimeout(() => {
          const animResult = animations[i];
          const OneValue = animResult[4];
          const TwoValue = animResult[5];
          // const [barOneIdx, barTwoIdx, condition, pivot, OneValue, TwoValue] = animations[i]
          const newHeightOne = OneValue //arr[barOneIdx]
          const newHeightTwo = TwoValue //arr[barTwoIdx]
          barOneStyle.backgroundColor = '#162447';
          barTwoStyle.backgroundColor = '#162447';
          pivotStyle.backgroundColor = '#b6eb7a';//'#438a5e';//'#2DF009';
          barOneStyle.height = `${newHeightTwo}px`;
          barTwoStyle.height = `${newHeightOne}px`;
          setTimeout(() => {
            pivotStyle.backgroundColor = '#01BFFF';
            barOneStyle.backgroundColor = '#01BFFF';
            barTwoStyle.backgroundColor = '#01BFFF';
          }, 10);
          // pivotStyle.backgroundColor = '#01BFFF';
          }, i* ANIMATION_SPEED_MS);
        }
        else{
        setTimeout(() => {
          barOneStyle.height = `${OneValue}px`;
          barTwoStyle.height = `${TwoValue}px`;
          barOneStyle.backgroundColor = '#01BFFF';
          barTwoStyle.backgroundColor = '#01BFFF';
          // pivotStyle.backgroundColor = '#01BFFF';
        }, i * ANIMATION_SPEED_MS);
        }
      }
      
    }
  
    insertionSort(){
      const animation = sortingAlgorithm.insertionSort(this.state.data);
      const speed = animation.length > 20? 3: 30;
      for (let i = 0 ; i< animation.length; i++){
        const arrayBars = document.getElementsByClassName(classes.arrayBar);
        const animResult = animation[i];
        const barTwoIdx = animResult[0];
        const barOneIdx = animResult[1];
        const condition = animResult[2];
        // const[barTwoIdx, barOneIdx, condition, barTwoValue, barOneValue] = animation[i];
        if (condition === 'true'){
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;  
          setTimeout(() => {  
          const animations = animation[i];
          const barOneValue = animations[4];
          // const [barOneIdx, barTwoIdx, condition, barTwoValue, barOneValue] = animation[i]
          const newHeight = barOneValue; //taking the hight from index value considered as smallest to replace
          barOneStyle.backgroundColor = '#2DF009'; //'#01BFFF'; 
          barTwoStyle.backgroundColor = '#01BFFF'; //'#162447';
          barTwoStyle.height = `${newHeight}px`;
          }, i* speed);
        }

        else if (condition === 'swap'){
          // const barTwoStyle = arrayBars[barTwoIdx].style;  
          setTimeout(() => { 
            const animations = animation[i];
            const barOne = animations[0];
            const Two = animations[4];
            // const [barOne, barTwo, condition, One, Two ] = animation[i];
            const currBarStyle = arrayBars[barOne].style;
            const barVal = Two;
            currBarStyle.height = `${barVal}px`; //Swaping the height of index Two with index one on comparision
          } ,i* speed);
        }

        else{
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;  
        setTimeout(() => {
          barOneStyle.backgroundColor = '#01BFFF';//'#162447';
          barTwoStyle.backgroundColor = '#01BFFF';//'#162447';
        }, i * speed);
        }
       
      }
     
    }

    selectionSort(){
      const animations= sortingAlgorithm.selectionSort(this.state.data);
      const speed = animations.length > 20? 3: 100;
      const arr = this.state.data;
      for (let i = 0 ; i< animations.length; i++){
        const arrayBars = document.getElementsByClassName(classes.arrayBar);
        const animation = animations[i];
        const barOneIdx = animation[0];
        const barTwoIdx = animation[1];
        const condition = animation[2];
        // const[barOneIdx, barTwoIdx, condition, OneValue, TwoValue] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        console.log(barOneStyle)
        const barTwoStyle = arrayBars[barTwoIdx].style;
        if (condition){
          setTimeout(() => {
          const animation = animations[i];
          const barOneIdx = animation[0];
          const barTwoIdx = animation[1];
          // const [barOneIdx, barTwoIdx, condition, OneValue, TwoValue] = animations[i]
          const newHeightOne = arr[barOneIdx]
          const newHeightTwo = arr[barTwoIdx]
          barOneStyle.backgroundColor = '#01BFFF';
          barTwoStyle.backgroundColor = '#01BFFF';
          barOneStyle.height = `${newHeightOne}px`;
          barTwoStyle.height = `${newHeightTwo}px`;
          }, i* speed);
         
        }
        else{
        setTimeout(() => {
          barOneStyle.backgroundColor = '#162447';
          barTwoStyle.backgroundColor = '#162447'; 
        }, i * speed);
        }
       
      }
    }

    bubbelSort(){
      const animations = sortingAlgorithm.bubbleSort(this.state.data);
      const ANIMATIONSPEED = this.state.data.length > 20 ? 5: 45;
      for (let i = 0 ; i< animations.length; i++){
        const arrayBars = document.getElementsByClassName(classes.arrayBar);
        const[barSmallerVal, barBiggerVal, condition, barSmaller, barBigger] = animations[i]; 
        const barSmallerStyle = arrayBars[barSmallerVal].style; 
        const barBiggerStyle = arrayBars[barBiggerVal].style; 
        if (condition){
          setTimeout(() => {
          // const [valOne, valTwo, condition] = animations[i]
          barSmallerStyle.backgroundColor = '#01BFFF'; 
          barBiggerStyle.backgroundColor = '#162447';  
          barSmallerStyle.height = `${barBigger}px`;
          barBiggerStyle.height = `${barSmaller}px`; 
          barSmallerStyle.backgroundColor = '#162447';
          barBiggerStyle.backgroundColor = '#01BFFF';
          }, i * ANIMATIONSPEED);
        }
        else{
        setTimeout(() => {
          barSmallerStyle.height = `${barSmaller}px`;
          barBiggerStyle.height = `${barBigger}px`; 
          barSmallerStyle.backgroundColor ='#01BFFF'; //'#162447';
          barBiggerStyle.backgroundColor = '#01BFFF'; //#162447';
        }, i* ANIMATIONSPEED);
        }
      }
      const arrayBars = document.getElementsByClassName(classes.arrayBar);
      console.log(arrayBars)
      
    }
    render(){
        const {curValue, value, barcolor} = this.state

        const widthOfBar = 70/value;

        
        return(
            <>
            <div className= {classes.arrayContent} >
                {this.state.data.map((value, idx) => (
                <div
                    className= {classes.arrayBar} 
                    key = {idx} 
                    style={{height: `${value}px`, width:`${widthOfBar}%`, backgroundColor: barcolor }}>    
               </div>
            ))}
            </div>
            <div className= {classes.content}>
                <h1 style={{marginBottom: '80px'}}>Sorting Visualization</h1>
                <h4 style={{textAlign:'left', paddingLeft: '5px'}}> Select Data Points</h4>
                <Slider
                    min= {2} 
                    max= {100} 
                    value = {curValue}
                    onChangeStart={this.handleChangeStart}
                    onChange={this.handleChange}
                    onChangeComplete={this.handleChangeComplete}/>
                <div>{curValue}</div>
                <button style = {{marginTop: '50px', marginBottom: '50px'}} onClick= {() => this.resetArray()}><span> Generate Array  </span> </button>
                <h4 style = {{textAlign: 'left', paddingLeft: '5px'}}> Select Algorithm to Start: </h4>
                <button style = {{marginRight: '5px'}} onClick= {() => this.mergeSort()}> Merge Sort </button>
                <button onClick= {() => this.quickSort()}> Quick Sort  </button>
                <button style = {{marginLeft: '5px'}} onClick= {() => this.selectionSort()}> Selection Sort </button>
                <button style = {{marginTop: '5px', marginRight: '5px'}} onClick= {() => this.insertionSort()}> Insertion Sort </button>
                <button onClick= {() => this.bubbelSort()}> Bubble Sort </button>
            </div>
                    
            </>
        )
    }

}


export default SortingVisualization;
