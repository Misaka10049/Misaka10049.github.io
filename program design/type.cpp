#include<bits/stdc++.h>
#include<windows.h>
#include<conio.h>
#define key keybd_event
using namespace std;
//KEYEVENTF_KEYUP=2
void type(int code,bool shift=false)
{
	if(!shift)
		key(code,0,0,0),key(code,0,2,0);
	else
	{
		key(16,0,0,0),key(code,0,0,0);
		key(code,0,2,0),key(16,0,2,0);
	}
}
bool isbig(int code){return 'A'<=code&&code<='Z';}
bool issmall(int code){return 'a'<=code&&code<='z';}
bool isnum(int code){return '0'<=code&&code<='9';}
int main()
{
	freopen("in.txt","r",stdin);
	string s;
	int row=36;
	getline(cin,s);
	Sleep(2500);
	while(row-->0)
	{
		if(s=="")
		{
			getline(cin,s);
			continue;
		}
		for(int i=0;i<s.size();i++)
		{
			if(isbig(s[i])) type(s[i],true);
			else if(issmall(s[i])) type(s[i]-32);
			else if(isnum(s[i])) type(s[i]);
			else if(s[i]==' ') type(32);
			else if(s[i]=='\t') continue;
			else if(s[i]=='{') type(219,true);
			else if(s[i]=='}') type(221,true);
			else if(s[i]=='|') type(220,true);
			else if(s[i]==';') type(186);
			else if(s[i]==':') type(186,true);
			else if(s[i]=='=') type(187);
			else if(s[i]=='+') type(187,true);
			else if(s[i]==',') type(188);
			else if(s[i]=='<') type(188,true);
			else if(s[i]=='-') type(189);
			else if(s[i]=='_') type(189,true);
			else if(s[i]=='.') type(190);
			else if(s[i]=='>') type(190,true);
			else if(s[i]=='/') type(191);
			else if(s[i]=='?') type(191,true);
			else if(s[i]=='`') type(192);
			else if(s[i]=='~') type(192,true);
			else if(s[i]=='(') type(57,true);
			else if(s[i]==')') type(48,true);
			else if(s[i]=='*') type(106);
			else if(s[i]=='&') type(55,true);
			else if(s[i]=='!') type(49,true);
			Sleep(75);
		}
//		Sleep(500);
		type(13);
	}
}
