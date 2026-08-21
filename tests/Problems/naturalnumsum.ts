function naturalnumsum(num:number)
{
let i = 0;
let sum = 0;
if(num<0)
{
    throw new Error(" entered num is less than zero")
}
while(i<=num)
{


sum = sum + i;
i++;

}
console.log(`sum of 1st ${num} natural numbers is : ${sum}`)
}


naturalnumsum(90);
