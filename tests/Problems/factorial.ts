function factorial(num:number):number{
let result = 1;

while(num>0)
{
 result *= num;
 num--;
}
return result;

}
//good
console.log(factorial(5));