# Mesh Midnight

Midnight is a next-generation blockchain that protects user, business, and transaction data. Its zero-knowledge (ZK) proofs ensure privacy without compromising data protection or ownership.

Mesh Midnight provides tools, documentations, and education materials to remove the barriers preventing organizations and service providers from leveraging Midnight technology.

[midnight.meshjs.dev](https://midnight.meshjs.dev/)


Transcript:

hi all this is Eric and in this episode we're going to talk everything about the
0:06
midnight examples this examples are provided by the court team itself for
0:11
midnight so we going to understand how to build the code what are the
0:16
prerequisites to compile a code build a code understand the structure and see
0:24
how we can uh Implement our first contract and run it and test it
0:30
all the documentation necessary for this uh series is going to be a store on the
0:36
midnight Ripple under Mage repository so um if you go to midnight you're going to
0:42
find examples and and this serious we going to talk about the midnight examples
0:49
version Z 0.2.0 so um in there under with me
0:55
you're going to find all the links um related to the documentation that we're
1:01
going to see now on how to install the different softwares that are prerequisites to compile the
1:13
code for our examples we're going to use Windows system for Linux version two uh
1:20
we have list all the procedures that we need to follow to make sure that we have uh Linux installs on our computer using
1:28
Windows so now let's go step by step um and install Windows subsisting in our
1:43
computer okay so let's start by opening uh Powershell on Windows make sure to
1:49
open Powershell as an administrator um so the first now we're
1:55
going to follow all the commands that were shown previously uh uh we first
2:01
install WSL on our computer this is going to install the default Linux
2:07
distribution um so we we install
2:24
it once we have installed uh Windows Linux for Windows in our computer we can
2:30
check by following the next commands this command is going to make sure to uh
2:35
to confirm if we have Windows for for Linux install our computer we have version number two we can confirm the
2:42
path uh location of the Linux distribution and then by pressing WSL we
2:49
can get into Linux and then to see the final version we can type release and we
2:55
can confirm that we have version 244
3:01
[Music]
3:07
we are going to use Docker desktop for Windows to run uh and host our midate
3:14
instances and another third party Services instances so just follow that link and download the executable uh once
3:22
downloaded we can check if everything it's was installed correctly
3:31
okay now let's install Docker together we follow that link provided uh once we
3:38
are into that link we click on that executable link once downloaded uh you want to follow all the
3:45
procedures and then you can operate the software of Docker and once installed you can go on settings and confirm that
3:52
the wlsl feature it's enabled
4:01
the wallet that we're going to use to interact with the m network is called lace wallet I'm providing the link with
4:07
the detail documentation on how to install a wallet but in the next video
4:12
I'm going to do this process so you can see it step by step okay so in that link we're going to
4:19
find the executable of the wallet so there's different versions we're going
4:24
to use 1.2.5 so we're going to download it
4:31
once it's downloaded we have to UNP it so we're going to select the the wallet
4:37
and then we
4:49
unip once that we have unse the wallet now we open the browser Chrome that is
4:55
compatible with the m wallet and then we have to make sure uh once we enter the
5:01
uh extensions management we are in the developer mode so at the top right
5:07
you're going to see this toggle you have you can switch it on and off make sure it's on and then we have to load the
5:14
unpack version We select the uh the executable that we just unloaded and and
5:23
inserted into the into the executables then we can see that we have the midnight extension install so now we can
5:30
open it um put put the password over there and then we have our wallet over
5:36
over there and ready to be used we have to wait for for it to be synchronized
5:41
and once it's synchronized we're going to see that we have some T dust in our
5:47
wallet there you
5:55
go in case you need to acquire some tust by in when you install a fresh wallet
6:02
there is a there is a faucet so um we we
6:07
have to copy our receive address so we open our lace wallet that we just
6:13
installed and then we select the the receive address one
6:19
selected we go back to the faucet we paste our address and then we request
6:25
for for toket we want to have to wait uh between one and two minutes and once
6:33
that process is done uh and once we are our wallet it synchronized we're going
6:38
to receive 1,000
6:56
tust okay so the process is done we can see that transaction hash over there so
7:01
once we uh go back to our wallet we can see that we already have those almost a
7:06
th000 tust that we had before when I show you how to install the wallet but once the wallet is synchronized we must
7:15
uh have another a th000 tust so there you go we have almost 2,000 tust
7:29
the IDE that we're going to use for this tutorial is BS code so if you want to
7:34
follow with the same software that I'm using you can uh follow that link with the documentation on how to download vs
7:43
code once we have VSS code install open it and make sure that you have connected
7:49
to the Linux distribution uh to make sure uh you have you have to see at the
7:55
bottom left uh message saying you are connected to
8:07
WSL okay now let's download the proof server in our machines the proof server
8:12
is responsible for creating the proof that midnet uses to send commands to the
8:19
node the private information never leaves the users machine so the proof
8:24
server receive those private information creates a proof and it actually sends that proof to the note so we're going to
8:32
follow the steps provided in the documentation on that link to download
8:37
the proof server okay now let's follow the commands provided on the documentation
8:44
of that of that link uh we first confirm that we have Docker installing our computers we can see the version and we
8:51
are connected to the Linux distribution so now let's start putting the commands and install the proof
8:59
server first we we search through the bidnight network uh Docker ecosystem to see what
9:06
are the instances available for us to download using Docker we can see that we have a proof server so we can download
9:14
the proof server we use this command to download one of the version of the proof
9:19
server so we have to put a version over there so to see what version we need we
9:25
can go to the midnight documentation and there is a compatibility Matrix so since
9:31
we are using the latest version um we're going to see over there that the latest
9:37
version is 3.07 so now with that version we uh
9:46
update that command and we put over there 3.07 and we run the command with this
9:52
we're going to install the proof server on the docker
9:58
engine we got confirm this by opening Docker and seeing that one of our images
10:04
it's over there it's the docker it's the proof server 3.07 now with this command we can check
10:12
the versions that were installed and we can see there that we have a
10:19
3.07 now to run the proof server we can
10:25
use this command that is going to run that instance on Port 630
10:31
0 so if we run the command we can check that the docker engine now has a
10:38
container running on that
10:45
port to close that instance we can press contrl C to actually shut down the
10:52
instance and we can confirm now that the instance is shut
10:57
down okay now to demonst rate that everything is working correctly we can
11:02
send some tokens to ourself so let's open the the lace wallet and wait wait for it
11:11
to sync let's confirm that we are in the tested network uh the note address it's
11:17
the public address provided by midnight the proof server it's our local
11:25
instance the indexer also it's the public link provided by
11:31
midnight make sure to confirm that uh we are in the tested
11:40
Network so now that the wallet has synced uh let's start our proof server
11:48
on the docker
11:55
desktop we can we want to see the logs over there
12:00
so now let's send some tokens to ourselves so we select our receive address and we're going to send to our
12:08
same address one tust just for demonstration purposes so we
12:14
sent and we have to sign the
12:20
transaction after signing a the the
12:25
wallet is going to start working and we're going to create a transaction that need needs a proof so if we open the
12:31
docker desktop we're going to see that the we're going to see that the proof
12:37
server is working and uh it's creating the proof once it's done we're going to see a log
12:44
saying how much time it took to create that proof
12:50
yeah in this case it took 29
12:56
seconds so in the wallet we can see that that the transaction has
13:02
already been sent to the note so now it's showing that um the wallet is
13:09
sinking um and we have to wait for final confirmation there it
13:23
is now we are going to download the compiler that is necessary to develop
13:31
contracts in Midnight the compiler it's called Compact and it's considered to be
13:37
a DSL domain specific language so you write code in a specific syntax and
13:44
format and then the compiler transform that codes into typescript that is
13:49
actually used within the apis uh this compact is where you
13:55
actually write your circuits and your logic
14:01
okay so now let's download the compiler so I'm in my Linux distribution I'm
14:08
going to create a new folder that I'm going to call my
14:16
binaries so I can check that this new folder was created my
14:23
binaries so now H let's let's check for the executable that I can download for
14:30
the compiler so in the comp compatibility Matrix I can see that the latest version of the compact C it's uh
14:39
0.22 so I go to the compiler page and I download the executable for
14:54
Linux once we downloaded the executable I'm going to copy and then I'm going to
15:01
paste it on Linux so I'm going to look for my folder that it's under home Eric
15:08
um my binaries folder that I just created and I'm going to paste it over
15:13
there once I have it on on Linux I go to vs code and then I go to the my binary B
15:23
binaries folder once over there I can now check
15:30
that I have the Sip file so um I'm going to unip
15:43
it okay now that I have unip the
15:48
compiler I'm going to check that the compiler was installed
15:54
successfully I can check that it's installed but now I also want to run it
16:00
not necessarily within the folder itself so I have to update my bash or C folder
16:07
in Linux following those commands the compat home and the
16:13
path so now if I refresh and run those export commands I can run the compact C
16:20
which is a compiler externally without having to be within the folder
16:31
now we're going to download the compact plugin provided by the midnight team uh
16:36
if you're using vs code this plugin highlights a specific combat language features like keyword string and
16:45
comments and we're going to use it when writing a smart contract using comat language okay now we want to download
16:52
the plugin so we go first to check what is the latest version of the plugin
16:57
which is zero .213 so we download the
17:04
package this this package is already and sied so we just need to copy and paste
17:11
it on on a folder on the Linux distribution so we going to paste it on
17:17
the same folder that we saved the comp compiler in the the first time so we
17:23
just paste it on my binaries folder
17:34
once once I have it over there I can open the extensions on vs code and then
17:39
click install from V6 then I have to select the folder that I have just saved the the plugin select
17:48
the that document po uh with extension Point V6
18:04
and then it says it has completed installing the extension so now I can open the extension and and and write
18:12
Compact and I can see that I have an extension named
18:17
Compact and I can see the latest version that it's
18:26
0.2.3 okay now we going to down load the midnight examples in our
18:32
computers uh we're going to need to go to the midnight repository under uh Mage
18:39
organization and then we're going to clone that repository we're want to make sure that we have node and J install but
18:46
that procedure I'm going to Showcase during the next video okay so we are under the Mage
18:54
organization uh and the under midnight Repository
19:00
so now to clone it just copy the link of the repository and we're going to go to
19:07
vs code and we want a clone by uh writing git clone and
19:14
putting that link that we just copy since I have already clone it uh if
19:22
I press Ls I'm going to see that I have a folder called Midnight which are the
19:27
examples so by clicking CD midnight I'm going to enter on into that folder and I
19:35
can see that I have uh different folders inside the midnight examples I can see
19:41
on my left as well how that repo is
19:48
structured so for this example we're going to enter into the midnight example
19:54
themselves they are under the folder uh midnight examples and midnight example
20:01
0.2.0 we're going to check that we have a version of notes uh
20:07
18 in case you don't have that version or you don't have note install I'm
20:13
providing the link necessary to install noes in this case we're going to use NVM
20:19
which is the easiest way to install noes so we copy the link and we just
20:28
install NVM since I have already NVM installed
20:34
in my computer I can check that I have
20:43
NVM and I have JN install uh by pressing the the following
20:56
commands with NVM Das Dash version I can
21:01
confirm that I have the version 0.39 of
21:07
NVM with note that Dash version I can see that I have version
21:15
18 if you don't have version 18 you can uh write NVM install and automatic
21:22
automatically NVM is going to install the late the the version 18th that is required for this midnight
21:29
examples now you can check that you have journ install your computer in case you
21:35
don't you don't have journ you can type corac enable and Jour is going to be
21:40
install in your computer and you can check by by writing Jour Das Das version
21:47
to see the latest version of
21:53
Jour okay perfect now we are ready to build and text examples first we're
21:59
going to build the repository and then we're going to run the examples there are two uh projects inside the midnet
22:07
examples one it's the counter example and the other one is the bulletin board example and we uh with the counter
22:14
example we're going to run it using testet remote configuration and Standalone configuration and the same
22:20
thing is going to happen for bulletin board we're going to run it using tested remote uh configuration and EST
22:26
Standalone configuration all also for the bulletin board we're going to run the UI so we're going to open our
22:33
browser and we're going to see the constructs uh using our browser and
22:39
wallet okay let's now build the project let's first make sure that we
22:45
have the latest version of note installed required for this um example
22:52
which is version 18 now by running Jour we going to install
22:59
all
23:11
dependencies after running Jour we want to have a folder called note modules all
23:17
in all dependency are going to be installed in that folder now we are using turbo repo in
23:25
this repository to build all the work spaces so by running npx to build we're
23:31
going to start building all the works spaces that includes the counter and the bulletin board
23:55
example okay 10 successful installation were
24:04
perform so now we are ready to start testing and writing the examples we are
24:10
going to first start with the counter example so let's go to to that folder we
24:17
copy the the path of the counter example and then we go into that folder
24:37
within that folder you're going to see that you have a contract folder and a and a contract CLI folder under contract
24:46
you have to make sure that you have the um the output of the compiler after
24:54
having done the compilation
25:00
now to run the the Contra example let's go to the
25:05
Contour CLI
25:13
[Music] folder and by looking at the package
25:19
Json of that folder we're going to see that we have two ways of running this
25:24
construct there's other ways but we're going to actually use two ways the tested remote configuration and the
25:32
stand alone configuration
25:46
yeah for this examples make sure you have the the docker desktop open and and
25:55
you're running the uh the proof server
26:08
we're going to start testing this contract using the test net remote configuration so by running J tested
26:15
remote we're going to start uh testing this um this contract on that
26:22
configuration we have two options we can build uh by creating a fresh wallet or
26:27
by importing a a seat phrase so we want to choose uh option number one so after
26:34
running that command we can see that we have created a wallet where the seat is
26:40
it's specified and then we have also a wallet
26:48
address we have to copy the this address of our contract and we have to fund it the way
26:56
to do this is by open our our existing wallet that we have already requested
27:02
some tust and then we have to transfer some tust from the wallet that we have
27:07
tokens to this new address that we just created for testing the counter contract
27:33
we are assigning the transaction make sure you have the proof server
27:48
open this process normally takes between 10 20 seconds we can see that we are uh
27:56
processing uh the proof server is generating appr proof it took 23 seconds to generate
28:05
aof and then we are waiting for for our wallet to sync once it sync it means
28:11
that the funds have already been transferred so back in vs code uh we are
28:17
waiting for those funds to reach our our uh wallet that we are using for testing
28:23
this contract once we receive those funds uh we we want to a message is
28:29
going to pop up saying okay we have received those 50 tust that we just sent in this case it's 50 Millions
28:37
because um actually we're using other units but it's this 50 Millions it's
28:44
actually 15 tust as if as it's seen in the wallet okay once we have deployed the in
28:52
we have initialized our wallet we can deploy a new contract or join an existing contract in this place we're
28:59
going to create a a new contract so we choose option number
29:06
one for this a proof is is going to uh
29:12
is going to be created as well and this in this case it took 10 seconds so now
29:19
we're just waiting for the transfer to be processed by the adult
29:36
okay so a new contract has been created we we can see the deploy contract
29:42
address we can copy it in case we want to join that contract later and now we
29:48
have three options one option to increment the counter one option to display the value
29:54
and the other one to exit the contract so let's see the current value of the
30:01
counter by pressing option two we can see that the counter value is zero so if
30:07
we run the option number one we actually going to run a circuit that increments
30:12
that value so if we choose option number one uh a
30:17
proof the proof server is going to create a new proof for that circuit we
30:23
can see that it's processing
30:39
and we can see that it took almost 11 seconds so we just have to wait for it
30:45
to uh synchronize
31:03
okay so we just received the transaction hash means the transaction was successful so now if we uh press option
31:12
number two we're going to see the current value of the counter and we see that it's uh its value is it's uh it's
31:20
one which means the the circuit was run successfully
31:28
okay by pressing option number three we exit this
31:34
contract okay now we going to build this Contra project uh using the estan alone
31:41
configuration in this case we're not going to use the links provided the instances provided by the midnight team
31:49
actually we're going to host and run those instances uh using Docker and everything is going to be deployed in
31:56
our machines so we close the the proof server that we will
32:04
running because we're going to embed all these instances within this repository now and we're going to run a command to
32:11
spin up all these instances uh all together so by running Jour stand alone
32:17
we're going to spin up these instances and by opening Docker we can see that
32:22
those three three instances were initialized so we can see the proof
32:30
sver we can see the counter node and we can see the
32:47
indexer we can also see all the logs from those instances
33:07
we can see that the wallet has already been funded since we are using a headless
33:13
wallet um we we are using a SE phrase that it's already configured and once
33:20
initialized we already have those tust available so now we choose option one
33:26
and we're going to go through all the procedures that we that we went by using the testet remote configuration but now
33:33
we're going to use the local uh
33:50
configuration so we are deploying the contract now
33:58
so we see that the proof server took almost 18 seconds to generate the the
34:07
proof so once the contract has been deployed we can see the address of that contract and then we have those two
34:13
options increment the counter or display the actual value the current value is
34:21
zero so if we choose the option number one to run the circuit to increment the
34:27
counter uh we can do that by choosing option number one by selecting this again we
34:35
going to start generating a new proof so if we open the docker desktop we can see
34:42
that a new proof it's been generated
35:00
in this case it took 10 seconds to generate a
35:10
proof once the transaction was submitted successfully we can see the transaction
35:15
hash and then if we click option number two the uh updated value it's it's one
35:22
now so the circuit was run successfully
35:34
perfect so now let's start the new
35:42
example okay now let's start building the other example which is called the
35:47
bulletin board example so if we copy the path of that
35:53
project and we go to that folder we're going to start um running that uh that example but first
36:01
we can see the structure and we can see that we have some folders inside just to
36:06
make sure that everything was built correctly by going to the contract folder under managed bulletin board we
36:13
should see all the outputs of the
36:25
compiler okay let's go now to the bulletin board CLI folder so we copy the
36:30
path and we paste that path to make sure that we are under the bulletin board CLI
36:41
folders if we open um the bulletin board CLI folder
36:48
and we go to the package Json we can see under that package as well that we have
36:55
two ways of running this example using the testet remote configuration
37:00
and the estan alone configuration so let's first uh start
37:07
running this project by opening Docker desktop and make sure that you have the proof server
37:21
ready so now run the command Jour tested remote
37:28
for this contract uh again we have two options a build a wallet from from fresh
37:37
a fresh wallet or build a wallet from an existing seat phrase so in this case we're going to
37:43
build a fresh wallet so we choose option number
37:50
one this case we created a wallet and we have a seat phrase and we have a wallet
37:55
address again since this is a new wallet we have to fund this
38:03
wallet we can find it fund it by using our existing wallet that we already have
38:08
tust and send send some tust from our wallet in the browser to this new wallet
38:16
that was created for the bulletin board contract so we paste the address and we
38:21
sign the transaction
38:31
make sure you have the proof server open and run it because for sending transaction you also generate a proof so
38:39
you can see that the proof server is generating a proof for this
38:47
transaction and it took 22
38:53
seconds now we're just waiting for the wallet to be sync and once it synced
39:00
we're going to see that we have received those funds in our new exist our new
39:05
wallet so we just have to wait
39:31
there you go we just received 50 tust it says 50 Millions but it's actually 50
39:38
tust so now once we have our wallet funded we have to options we can uh
39:45
create a new bulletin board contract or we can join an existing bulletin board contract in this case we want to create
39:51
a new contract so we choose option number one for this again a new Pro is going to
39:57
be generated so if we open Docker desktop we're going to see that a new proof is been
40:03
generated in this case it took almost 10
40:16
seconds we are just waiting for the CLI to update the information that just got
40:22
processed and we can see the the contract address being displayed
40:27
and now we have uh six options one is to pause a message another take down your
40:33
message another one to display the current Ledger state known by everyone
40:39
then display the current private State and another option to display the
40:45
current gve state this is just known by you and another option to exit the
40:52
contract so to start testing this contract we want to start posting a new message so we choose option number one
41:00
then an option to to write a message is display we're going to write
41:06
hello all and we send the transaction so again the approv server
41:12
is going to start working and it's going to generate appr
41:23
proof and it took almost 10 seconds to generate approves so now we just have to
41:29
wait uh for this transaction to be processed by the note and be displayed
41:34
on the [Music]
41:45
CLI there you go the the post message was just uh submitted so if we take a
41:52
look at the Ledger State we can see the the updated state of the construct
41:57
by choosing option number three we can display the current layer State we can see that the current state it's occupied
42:05
the current message it's hello all the message that we brought the current instance it's one and then we have the
42:12
current poster which is the hash of the of the current user if we choose option
42:18
number four we're going to see our current secret key we actually get to see this
42:24
secret key because it's available within the client within the client computer if
42:30
we choose option number five we can see other information like the current state the message the instance and some uh
42:38
custom messages that can be generated so now let's try uh executing
42:46
a new circuit which actually takes down the message so if we if we choose option
42:51
number two we are going to run and execute the circuit and again the if we
42:57
open the docker desktop we're going to see that the proof server is generating a new
43:10
proof in this case it took almost 10
43:16
seconds so now um this proof is going to be sent to the nodee and it's going to
43:22
be processed uh we are just waiting for the for the transaction to be processed
43:27
and be shown on the CLI okay the circuit was processed
43:34
successfully so now if we run again and see the current layer
43:40
states by choosing option number three we can see that the state now it's uh
43:46
vacant the current message is none the distance is two and we can see the has
43:52
of the current poster
43:59
by choosing option number four we can see the secret key that hasn't been
44:05
changed and with option number five we can see that the state is vacant none
44:10
the current instance is two and the current poster is not du because actually the the the state of the
44:17
bulletin board is vacant by choosing option six we just exit the contract
44:33
okay now we have already tested the bullet the bulletin for example let's run it now using the estan alone
44:42
configuration for this we're going to close the proof server because we're going to run it
44:50
using the a Docker compos a command so under the bullettin Bard CLI
44:58
folder let's run Jour Stalone we're going to spin up three
45:04
instances if we open the docker desktop we can see that we can confirm that
45:09
those instances were um started we can see the no
45:15
instance the proof server instance and the indexer instance that
45:22
were spin up successfully we can all we can actually
45:27
see the logs as well from the proof server in this case since we are using a
45:35
local configuration we are going to be provided by in by a wallet that it's already been
45:41
funded so we can go straight away uh deploy a new bulletin board
45:47
construct if we choose option number one we're going to start the
45:53
deployment procedure so we see that the proof server it started to generate a
46:08
proof it took almost 18 seconds to generate this
46:14
proof and now that proof is being sent to the node and we just have to wait uh
46:19
to be updated on the CLI
46:28
there you go a new contract has been deployed and we can see the contract address and we can see those options
46:37
again so we're going to follow the same procedure we're going to start uh
46:42
posting a new message we can write a
46:48
message we going to write hello all and then we uh start securing that
46:56
circuit again the proof server is going to start generating a proof by opening
47:01
the docker desktop and see and see the logs of the proof server we can see what the proof server it's actually doing
47:31
depend depending on the circuit this might take uh more time and it's going to depend also on the resources
47:38
available on your computer so we can see that the proof server is
47:45
working generating all that proof
48:16
the proof was already generated so now we can see the current
48:21
liser states by choosing option three four and five with option number three
48:27
we can see that the current state it's occupied the message it's hello all the instance it's one and we can see the the
48:34
current
48:43
poster with option number four we can see the current secret secret
48:52
key and with option number five we can see some addition
48:57
information like the current state and some C
49:12
information okay now let's H run the other secret which is uh it's um it's
49:19
going to take down the message of the contract so by choosing option number two we're going to start running the Tet
49:26
and we can see that the proof server is started generated start started to generate a new
49:42
proof again this might take a few seconds so we just have to wait for the proof server to do its
49:54
work we can see the looks of the proof server what it's actually
50:08
doing sometimes the pro server stop showing the logs uh when it when the
50:15
Serge read the proof when that happens you can close the docker desktop open
50:21
the desktop again I start writing the proof server and everything is going to start working again
50:35
okay so the circuit was executed successfully so now we can take a look
50:41
at the current ler States Again by running option number three we can see now that the current
50:48
state is vacant the current message is none and the current instance is two
50:54
which means that the circuit was run
51:01
successfully now with option number four we're going to see the the current secret key which is the same it hasn't
51:08
been
51:13
changed and with option number five again we can see the current states the message the instance and some custom
51:20
information
51:31
perfect now now with option number three we exit the contract and now we have
51:36
successfully tested the the the these two examples using uh the CLI for the
51:44
bullettin board example there is another option to test this contract using an a
51:50
user interface so for this we can go to the bulletin board UI folder we going to
51:58
copy the path and make sure to go to that
52:03
folder you can do that by opening your um the vs code and and and writing CD
52:12
and clicking and copying the the link of that folder so now we are under the
52:17
bulletin Boi if we go to that
52:24
folder and open the um the package
52:30
J we can see that we have options to start the HTTP server and an option to
52:38
build the the code the code has already been built running turbo so we just need
52:45
to uh run the start command if you go to the main uh file make sure to to have this
52:55
configuration as display
53:01
wa since we're going to be using the testet
53:16
network okay so now to R for for running our server we going to use the command J
53:24
start so the server we we are going to be able to talk with the server and see the UI by going to
53:32
that um to that link again make sure to open Docker
53:39
desktop and run your proof
53:47
server so if we go to that link the GUI can be
53:55
shown make sure that you have your wallet connected you have some
54:03
tust the wallet it sync under settings we can confirm that we are using the
54:09
test and network and the links are being provided
54:14
the note address this is the public link provided by midnight under proof server we have the
54:21
link where our actual local proof server is running and then under indexer we have
54:28
the link provided by midnight that it's an instance being host by
54:35
them okay so now we are ready to start testing this contract using the UI so we
54:42
can create a new bulletin board we are ass signing a
54:54
transaction and we can see the the proof server is generating a new
55:04
proof in this case I'm having the same issues with the proof server so what I'm
55:09
going to do is just close the dog the dog engine and and run it again
55:33
there's you go the a new contract has been uh published on the blockchain and
55:40
we can see uh that now we are a available uh we're able to um write a
55:46
new message if we type hello all and send this transaction
55:57
going to be asked to sign the transaction and a new proof is going to be
56:03
generated we had a a network ID issue that it's saying that uh we are talking
56:09
with the undeploy network when it was expected to talk with the test Network
56:15
when that happens we can go back to the uh bullettin brii make sure that we're
56:21
running the node version 18 and if we go to the
56:27
to the main file make sure just to write again
56:32
the test net so under network ID we to have different options make sure that
56:37
you have selected a test net uh option and now we have to build this uh this
56:44
code again we don't need to build the hold repository so just build the bulletin Boi by running J build
56:59
here okay now that it's been built we're going to start the server Again by running J start and we're want to start
57:07
we're going to test if we are able to run the the
57:15
contract okay so I paste the link and we're going to start again we make sure
57:20
that our wallet is sync and we uh first create a new bulletin board we signed a
57:27
transaction and uh we see that uh the proof server is started generating a
57:40
proof a new proof has been generated it took almost 11
57:49
[Music] seconds so now now we just have to wait for for the proof to be sent to the note
57:57
and our UI uh catch up with the
58:03
indexer there you go a new bulletin board was created so now we have the contract address and we have the option
58:10
to post a new message so we can write a new message
58:18
we're going to write hello all from the browser make sure our wallet is sync so
58:26
so now we can run the circuit so in this case we are running the circuit to post that
58:33
message so we want to be asked to sign the transaction again we're going to sign it with our
58:41
wallet and the proof server is going to start generating a
58:49
proof it start it started to process and it took almost 11 seconds to Creer
59:10
proof once the proof was generated this proof is going to be sent to the note and again once the index are ER catch
59:19
UPS uh our UI is going to display the new message there you go so now we have the option to erase
59:27
that message from the bulletin board again we press the the option to erase
59:33
we're going to have to sign a transaction we sign the transaction
59:39
using our wallet if we open the docker desktop we can see that
59:46
the the appr proof server started to generate appr proof it took almost 11
59:52
seconds to generate this proof
1:00:02
and again this proof is going to be sent to the notes and we going to have to wait for the
1:00:07
indexer to send the the updated information there you go the bulletin
1:00:13
board uh has erased the uh the message so now a new user can post a new message
1:00:19
there you go we have tested these two smart contracts and we can close the the
1:00:25
contract by by pressing contrl
1:00:31
C with this we conclude this first episode which its goal was to build and
1:00:38
run the midnight examples repository for another episode we're going to see more in detail how this repository is
1:00:46
structur and we going understand the codes that that are inside this repository see you next time