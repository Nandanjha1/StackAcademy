// Write your code here
#include<iostream>
using namespace std;
int main() {
    int n;
    cin>>n;
    for(int i=n;i>0;i--){
        for(int j=1;j<=i;j++){
            cout<<"*";
        }
        cout<<endl;
    }
    cout<<"Hey It's me Nandan Kumar!";
    return 0;
};