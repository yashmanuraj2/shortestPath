import React from "react";
import { useState, useEffect } from "react";
export default function Path(item) {
  const [cols, setcols] = useState("");
  const [rows, setrows] = useState("");
  const [show, setshow] = useState(false);
  const [path, setpath] = useState([]);
  const [imp, setimp] = useState("");
  const [max, setmax] = useState("");
  const [show1, setshow1] = useState(false);
  const [matrixsize, setmatrixsize] = useState(
    { rows: rows },
    { columns: cols }
  );
  const [matrix, setmatrix] = useState([]);
  const [num, setnum] = useState("");
  const [array, setArray] = useState([]);
  const changerows = (e) => {
    e.preventDefault();
    setrows(e.target.value);
  };
  const changecols = (e) => {
    setcols(e.target.value);
  };
  const enterData = (e) => {
    e.preventDefault();
    setmatrix(e.target.value);
  };
  const getnum = (e) => {
    e.preventDefault();
    setnum(e.target.value);
  };

  const showmatrix = () => {
    setshow(true);
  };

  const NumtoArray = () => {
    let arr = [];
    let mat = [],
      i,
      k;
    arr = String(num)
      .split("")
      .map((num) => {
        return Number(num);
      });

    for (i = 0, k = -1; i < arr.length; i++) {
      if (i % cols === 0) {
        k++;
        mat[k] = [];
      }
      mat[k].push(arr[i]);
    }

    setmatrix(mat);
    console.log(matrix);
  };

  const Display = () => {
    return (
      <div>
        <table>
          <tbody>
            {matrix.map((row, i) => {
              return (
                <tr key={i}>
                  {row.map((col, j) => {
                    return <td key={j}>{col}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  /*const CreateMatrix = (props)=>{

  let mat =[]
  for(let i = 0 ;i<rows;i++){
     for(let j = 0;j<cols;j++){
        mat[i] =[]
      }
  }
for (let i =0;i<rows;i++)
{
  for(let j=0;j<cols;j++)
  {
//create a random matrix 
   mat[i][j] =Math.floor(Math.random()*10)
   
  }
}

setmatrix(mat)
console.log([matrix])
console.log(matrix.length)
if(props.show!== true)
return ""
else 

  return(
    
    <div>
      <table>
        <tbody>
        {matrix.slice(0, matrix.length).map((item, index) => {
            return (
              <tr>
                <td>{item}</td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}
*/
  //create a  2d matrix

  //
  const Floyd = () => {
    let dist = [];
    let path = [];
    let n = matrix.length;
    for (let i = 0; i < n; i++) {
      dist[i] = [];
      path[i] = [];
      for (let j = 0; j < n; j++) {
        dist[i][j] = matrix[i][j];
        path[i][j] = i;
      }
    }
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            path[i][j] = path[k][j];
          }
        }
      }
    }
    console.log(dist);
    setpath(dist);
  };

  const DisplayFloyd = () => {
    return(
    <div>
      <table>
        <tbody>
          {path.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((col, j) => {
                  return <td key={j}>{col}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    )
  };

  /*const FLoydWarshall = ()=>{8



  let dist = []
  let n = matrix.length
  for(let k=0;k<n;k++){
    for(let i=0;i<n;i++){
      for(let j=0;j<n;j++){
        if(matrix[i][k] + matrix[k][j] < matrix[i][j]){
         matrix[i][j] = matrix[i][k] + matrix[k][j]
        }
      }
    }
  }
  return [dist]


} 
*/

  //calculated by the weight of edges attached to the node. The most weighted node is the node with the highest importance.
  //if two edges have same weight then they have equal importance
  const Importance = () => {
    let sum = 0;
    let arr = [];
    let max = 0;
    let rows = matrix.length;
    let cols = matrix[1].length;

    for (let i = 0; i < rows; ++i) {
      sum = 0;
      for (let j = 0; j < cols; ++j) {
        sum = sum + matrix[i][j];
      }
      arr.push(sum);
    }

    max = Math.max(...arr);
    console.log(arr);

    let index = arr.indexOf(max);
    setmax(max)
    setimp(index+1);
    console.log(index);
    console.log(max);
   
  };

  const DisplayImp =()=>{
return(

  <div>
    <h1>The most important node is {imp}</h1>
    <h1>Its Weight is {max}</h1>
  </div>
)
    
  }

  return (
    <div>
      <h3> Enter the number of rows </h3>

      <input type=" number" onChange={changerows} />
      <h3> enter the number of cols </h3>
      <input type="number" onChange={changecols} />
      <h3>
        Enter the value of cells as a single number( Length of which should be {rows*cols}), which will be parsed into a
        2d MAtrix with the given matrix size.(Please enter a valid number){" "}
      </h3>
      <input type="number" onChange={getnum} />
      <button onClick={() => NumtoArray()}> Get your input matrix </button>
      <Display />
      <button onClick={Floyd}> Get the all pairs shortest Path matrix </button>
      <DisplayFloyd/>
      <button onClick={Importance}> Get the most important node </button>
      <DisplayImp/>
    </div>
  );
}
