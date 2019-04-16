#syntax: ./deploy.sh [dev or prod] [kerberos]
npm run build-$1
scp -r -o GSSAPIAuthentication=yes -o GSSAPIDelegateCredentials=yes dist $2@athena.dialup.mit.edu:
if [ "$1" = "dev" ]; then
  ssh $2@athena.dialup.mit.edu -K 'aklog athena sipb && mv dist/* /mit/courseroad/web_scripts/courseroad/dev/'
else
  ssh $2@athena.dialup.mit.edu -K 'aklog athena sipb && mv dist/* /mit/courseroad/web_scripts/courseroad/'
fi
