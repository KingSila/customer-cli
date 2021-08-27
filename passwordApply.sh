#!/bin/sh 
#set -o xtrace

#This script updates the password on the cluster and also on the repo

if [ $# -lt "5" ]; then
  echo "You need to pass username,Newpassword,oldencodedpassword,branchname,jiraticketnumber" #datasource name,namespace,environment#
  exit 1
fi

#env=$5
#before we run the next part we need to set kubeconfig eg: kubectl config use-context $5


#kubectl config use-context prod
username=`echo -n $1|base64`
password=`echo -n $2|base64`
oldpass=$3

cd C:/temp/production

#git checkout $4
#git pull
files=(`grep -l "$username" *`)
for i in ${files[@]};do
  echo "Secret Found.... "$i
  sed -i "s/$oldpass/$password/g" $i
  updatedpassword=$(cat $i |grep password |cut -d':' -f2|sed 's/^[ \s]*//;s/[ \s]*$//')
  echo "......$updatedpassword.....$password...."
  if [ "$updatedpassword" != "$password" ]
  then
    echo "failed to update secrets $i"
echo "password in current secret is $updatedpassword but you looking for $oldpass**"
  else
    echo "updating secrets $(cat $i |grep 'name:'|cut -d':' -f2|sed 's/^[ \s]*//;s/[ \s]*$//')"
    echo "kubectl apply -f $i"
  fi
  
done
#git commit -am "$5 Change passwords for $1" 
#git push

#sed "s/$oldpass/$password/g" $i
#sed "s/{{ USERNAME }}/$username/g" ./secrets > eppix/tmp.yaml
#sed "s/{{ PASSWORD }}/$password/g" eppix/tmp.yaml > eppix/tmp1.yaml
#sed "s/{{ DSNAME }}/$3/g" eppix/tmp1.yaml > eppix/tmp2.yaml
#sed "s/{{ NS }}/$4/g" eppix/tmp2.yaml > eppix/eppixsecrets.yaml

#rm -f eppix/tmp*.yaml
#Here we need to run kubectl#
#kubectl apply -f eppix/eppixsecrets.yaml#
