import React from 'react';
import './SortingVisualizer.css';
import { mergeSort } from './../SortingAlgorithms/SortingAlgorithms';
import { bubbleSort } from './../SortingAlgorithms/SortingAlgorithms';
import { quickSortHelper } from './../SortingAlgorithms/SortingAlgorithms';

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = '#aa6f73';
const SECONDARY_COLOR = '#eea990';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        }
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {

        const array = [];

        for (let i = 0; i < 70; i++) {
            array.push(randomIntegerFromInterval(5, 500));
        }

        this.setState({ array });
    }

    mergeSort(){
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if(isColorChange){
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;   
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                  }, i * ANIMATION_SPEED_MS); 
            }
            else{
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                  }, i * ANIMATION_SPEED_MS);
            }
        }   

    }

    quickSort() {
        const animations = quickSortHelper(this.state.array);
        console.log(animations);
        let k =0;
        for (let i = 0; i < animations.length; i++) {
            console.log(animations[i],k++);
            const [firstIdx,secondIdx,isSwap] = animations[i];
            const arrayBars = document.getElementsByClassName('array-bar');

            if(!isSwap){
                const barOne = arrayBars[firstIdx].style;
                const barTwo = arrayBars[secondIdx].style;
                let color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {                    
                        barOne.backgroundColor = color;
                        barTwo.backgroundColor = color;
                    
                }, i * ANIMATION_SPEED_MS);
            }
            else{
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                  }, i * ANIMATION_SPEED_MS);
            }            
        }
      }

    bubbleSort(){
        const animations = bubbleSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const [firstIdx,secondIdx] = animations[i];
            const arrayBars = document.getElementsByClassName('array-bar');
            const barOne = arrayBars[firstIdx].style;
            const barTwo = arrayBars[secondIdx].style;

            //to return to original color
            let color = PRIMARY_COLOR;
            let isSwap = false;
            
            
            setTimeout(() => {
                //when comparing compare height
                if(i % 2 === 0){
                    isSwap = parseInt(barOne.height) > parseInt(barTwo.height);
                    color = SECONDARY_COLOR;
                }
                barOne.backgroundColor = color;
                barTwo.backgroundColor = color;
                //if true, swapping heights
                if(isSwap){
                    const temp = `${barOne.height}`;
                    barOne.height = `${barTwo.height}`;
                    barTwo.height = temp;
                }
            }, i * ANIMATION_SPEED_MS);
            
        }
    }

    render() {
        const { array } = this.state;
        return (
            <>
                <div className='container'>
                    {array.map((value, idx) => (
                        <div className="array-bar" key={idx}
                        style={{height: `${value}px`}}>
                        </div>
                    ))}
                </div>
                <div className='button-row'>
                        <button onClick={() => this.resetArray()}>Generate New Array</button>
                        <button onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button onClick={() => this.quickSort()}>Quick Sort</button>
                        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                </div>
            </>
        );
    }


}

function randomIntegerFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(array1, array2) {
//     if(array1.length !== array2.length)
//             return false;
//         else{
//             for(let i = 0; i < array2.length; i++){
//                 if(array2[i]!==array1[i])
//                     return false;
//             }
//             return true;
//         }
// }