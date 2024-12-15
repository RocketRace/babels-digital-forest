// ns-params:@params
var imageBaseUrl = "https://88x31er.vercel.app/img";

// ns-hugo:/Users/olivia/Documents/code/site/unnamed/src/constants.ts
var width = 88;
var height = 31;
var totalBits = width * height * (8 + 8 + 8);
var totalBanners = 1n << BigInt(totalBits);

// ns-hugo:/Users/olivia/Documents/code/site/unnamed/src/prng.ts
var m = totalBanners;
var a = (m - 3n ** 41308n | 0b11n) ^ 0b10n;
var c = m - 5n ** 28195n | 1n;
var ainv = 0x5de57821816a4149b262cbdd8bd8f4dcb089dcdcf0b796f0482e002a0e049db11b3086e5d98671df6369a87ebf375160c38c5a1838376e328075b4a11a33664cb60be450f3387b9c54ec5f12accaa9edf9dc12343ebaff0a7223c86306535a075e49ed4e254eea929274a12c8688aee3c42f1238da29f07f1ce49dc9bf508e9a2eab057c33df0cf4fa8034e8a73223ea7cae469ddb20b44e26c46c6b67552eff927597ea1ad8868c6539e9548cb81f15896d447657196955b2cb4aef77f1174ab238775ac9adca614f3cfdbd0efc22228b431286f3a60e74138e12c603156e349f93b5daea5d70b35c68a865fed372d01519bfef8a69c5a4ff49349a46e08882fa868b6e0b2e30133485cdd8b5aff906cada9572cff7948a0d1a3c9998b0209a68447fd709948d9603f86381445bb30ea7f65ff95acdc73b79e5e5330d701032b4940da53f66adce1cf8a9c79ad0067c33091540ceb96d480834034a92d74c406452a5eed473665080ef5a9e3b613820155acb08bdf7729671379ce1ab9e5c31ba0dfaa4a4b4f56df7d51ae6b2191a0208380c5ff8c6186e42b04e4b1f4f22559d464b3fa817417fc6d77de100ff095cfe17b9d7d25b411afbeb15566733a3e6e4ed56791f9b7447db57c856a7a1a45bf3072284f31e2430276a18e2e4be478ca80684ed6d5dea002d4f613a7cb58ab659685abee3a9c195a765f46d2fc91a8e457d7170e4e9ea8c240164eea897ead29c9de83a51fba840fd113254c6b68093b7f2831b2f63b77c23b583cc4ea48cf4f580bf8261c5bbc21b7974566f30d8a137cc607711241c0809ac99ca44626a1c8818833073f7f3f218cfdb62ec1b1c3ae6a417666affe4066a022d61a5201f125097e33b93dac8eff7c0b466441c34252b98f7c3d687999099015db5b5c9a1c0d37f042629078c33a59d79761c216b03c0dadec6076ac407fcf5b5b4d4d034e2f17e050c1f8c0b69b2d3bf7cafa3b7ed58739c6b8d65119c18fb69f2901af9d117731e7a45ac6614511283f02b79a25213d22c631fb10d352144d97f0ef75a1cff7b4b37083dd1d404791dc926802a699a98aa51ac8ce13ed6e53464fc7c741a65854160fa78ca837875e267131f8f5aa17407d345a926d7a7592f55028771f484610742f2eabfaa3508cdc136c465821ec6bf91b0c08d10ecaa832f11a2940cd207af14464187c1993435d83c30c72f1fcbbe9ac7fee05944773fb45d356ae31560677303a47540cdaefd8e18aa77b2e78ee9f50623bd305e154718d08292b254440084fc1820775d6d321ccb43c3879fc2af4acc12ba1f2cd945c49e0ca01037a88105e904d27fd2a0ebf62a3faf63fdef954c512d4cec9ac1b31888acb2033c97e10eefa954698913bfd2cba856a1278e2fee96f9a43cd152f972c9de2f4a97d363de945322a8ff798c236c0fa6ce21c27dc8b60ffc52fc071e10d817af11dec45adaacf1fcc04d79a16bd7c1de5cd7fc9ec7c6e0b7f8164ffa29fa78cdf314fca5f801e4e64a61eeda298c1d1f1836c6565668087f93d59809b4d60ae7ac3efa06fb4e089c9ef71caa4a89a1f48a25abe6aa0306bab6c177f5d15a33da3403f1c59c83d39f1ad896c22aef626081d6877e4c830514305ecfa8d20e1ef20b1bb09616b16511cf590445b8dbcc4761e5746240a41b7ae5f582756c03820770ebb4a4688e3aecdd177ef6fcfd02dfe8d9d07c287e2bbdd22f438e9f10efb690e038659431d3ad1920a76056c2135e0420391a8a43242a229baa877eacdd20b00e16df53fb31cba582d1a64c5693e7bfa025930045e289ad735082e9b914b9b5c58c4100a806aabb87644f7881eeebbf5fd50142f94f921965315370fb74dde613ea24aae886432b878aa753cba6ab4657509b951ce934c55a6aa4ab013143a25a6d3ec1eb265367686d80e3283e3dc1fe96fd81a889d12bb0f26b46179667e2097ef121d1353b1204a9d8d464c7c3b435f644fb0189a9a508aae9480de4df0b1bdde97bd65f4be2a1715c331f45e796e3ab5a592daf706cb64ae9a07f68bd56e797257903770f5f0cd7c9c6125b3c5d0eebff9051050977898d28a650807328b471959548bc36cf9cbb10fa1ed663f7629c13e3cea55e927f61e8998296f1ffed9d7534ced75502ede8ff0bc1d46ceba370b2254515003cbd6a9790dc00815426a0e04cb94d07ee0a8de52e75a6baa3b54ec072c6b323b7ee4929c8fbef6ac9e3b08e7e1714d940c57a5646e35a39a5d255f2d640035b4b595812df962718b56af7491897a18d3d5cd7b020f4dbb44bb67ca3f78db71eae63dcea8655b03b84c1a83de14380b58b055a5a809e855cf6e90076d75efe415de897a03a0211a0e4fdff774b01209dfd2b9cc1831e4f7094b1fce11ded6760be77658b0a490d335f70fd982955509fcd4f5808d41348dc17dac505690bf3ee9bdd0fa96664e844cf107de99c2d9fcec667dafb32e02d36e3683d441601bd2822147ba6ddd374e2148504b51189f0951041ae40b645a3b1556c5b671c92d9e511ebd9732442dbcaa90ebeb5a1931ed2cac8367d9c62a72ce26bd682b6923eac0d0163dfb6ce9f9740d61bba523527d539f6f63a8734c4e63a979dad832f059825a9dc6450eb525bf1471b76fff34558b79fd54c01e8e09cb4d954220080d73531aaf4c848b307853d15b657b83cf6eb18badfb970e49d1b032ee4d6cd3f49a581c534eed1ea3f02067f9f7c0bf7cb28696c1541f46e393a0e27a044833264c7defac01ed8a0e5676ac9435a80300a68a6e682754539fd624b74a27b4139cf0718a87601227829e82ca38705d6bbc9c1db90c299232b528e45faac8a8bf204a61319f3933f7591174c8aa84c0933df15074a69d12d3f474a4e810506a3b0b6b17ed722de382860d1acf8f16cf2ea7399e9365b483caf1d5c97b54717f08f825a85b77224edc5750a141a13927b27d07e20ac3ddabdfedc5ae13656034b51b7fd5e19d67f48389fcd14685ce75eab0d16e76d7d45d00b2e81946662c576b1a598957b3c196a0e1871168ba8760825067f767a10c906e8d82b442a7a65621bd9da38411b9b4960a122f639d8c898b6af3f1734c3ae1bea87eed4a2b29585cdd9103c14b5927139f8ea16c048fcf9ebd78062cc540b0e7aff992ebc81b9b33baca7bd6ac386f17c3f2fb1be2140b2a607882c7cbec602841b6fdafa74c29343ea7aa9ef76839cade588dc678ee05000d92355d185701a1b428b608690ab2a77f4d62021e6db82b6891e757f268e364c9ec4c3ac5091fb3cc68b30854006ffcd692933f8b20543ce528e8a27b104dcfeed682a10f93457868cb883a2c6f5c5f5f91094dd7557b3d28da93ba8eb36992360ae5f8a11444ab4359733ac04525c128373267439d9eddd598b77b0354f22383d33e8e373587594f553e4b99f26bdca67a1d34d41b7530fec5df7b89669f7d48dc1bdab4c0d0a2ac3739f0ecd44beb32dadaefae8f12152df0c7d547e4e30c239a4a00561e98ed3613fb17559729f424a4f50868ead96efc5483a05cfd1ca7ad7ec32f97a37cb991ea538d5621aaaeaa9bde7ba73c335cce3e90a6c66b1ef1a06ff9cb2da2324359e0af451d5681dc8fc0e6f769e6c69430f4fa85970741e81d7dbdd31202c3fb9bfeb85947ca10838f1c2201c720c46a142e4ad1a59c1a9bdbbf5bb8180bba5ec3ef9ffa0f8575f552a6ac8707cc91a5a6fcbfda862d538421e0c9822c5bd1d219ec75a2b8f5488df6417d76bcde537632ff07f92dbdabd2a09aea77fbc13cf90f2d9967287e248c21cbcb1ae3fa81b37652eb0936db2c553de075060b13a35afd76b40cb157be014944c39a796591def2f482b1e9a0325b50174e11e4058faa84c9ecbfc9b5175e7009193d8cfce85c70bceab52d317d0113a9fe38279f2c30f61213f3131847ec9ec14426d8ba4a6a787708bdb2d84694ec70df62f5061b71b535552cce9c39e8be6a3b47091b5dce041e3bf8de8b40cea65d23bda80850be388b5c010fa90fce496c778c559c8c0a2102dbaf52a4cb18533eec2ed6bb5f90e27fd44af976c400cfb49eeae9ac4ca61bc9bff1143f3cf3f95b6e0968292d774aa54cd589ad248cf31a7b5af52a6d78b3df85e6e5fc564ab23f4f537131289bc10e85dec3bc4bc126899931173c791a14f07de261d8741a0a9bfe13de41c5493172bce0734db584626cee83c14ca4b4b219df55cb0bcbe3c4157d6bfae3832ba702392348b42e4afbcbe2f09e2e34287f64d54cfffad23c066a95f8cc7c21a3c7ab92fe2b057da35455a1606db0406dffeeafcc77695fa0319ddc4e2a8d8cb9a01e6d49d649b4b4578cd2b3b647f58cb3b4bb0ce0a777afaa003701f3c984a6024a0947652446881e3bd23fb0a8dcdba0e0b398524ca85c8fb049b4e54371c1c1aa6b5c273d38c99d6e17635a2612aa64e5c6249b72ccde40d678f7af1d52834dbdc2ce6ece805744cd58ea4cc654892b1f79fdaf94ff5a248c6116b01378d3309d4364e7c68ffac5c0bc1ca8adb3f4dce82c1d7e27ca76579f38a7bbd5181cf46d05e5e2d607e2e110a81a1662b1394173d8b82bc0fa641755a3e5304e9a8899f5de897248dafc126a9e5b986584c6356b6af7a5272a0ec93145922e193c076b276b11d7a638a59f4b29374044ec50487b75a4c3563fb075c58aab2043957aa01b680b6c89f0a0255e9f4fd7b6b394326061eaa93be8579bee3fa67e2ddcac93eb1ccd0ec4f12f510a82420a789772442e304b4edea14a12867e7d2507e986e6be530f213d4722f9c9314178c2bc05100c3c670ba073ebc721c2324581f48fa69ea3567d65b8bbbaeda924aa00a508880be6029d93e56fdf2b603a161436bc0ba5e7d466af077ca23ef0332185cfceb513c3f3a3acd555daec804bba9eb449bb97595f4375a01e14314cefd9df7618f26bb6a0e78bc30814ea2cd4f0f58d3258f8bbd782c5e30b811f7a402486ffc286e150481d1c8d965b934eb7cf580dd6b5a21bc2504f68423441b93d50e6e8c9bb292391da6fbcf27e305a439a3fec11cba9f164840c1fae0d9a91a5adf9bde8bf23cf5bff534cd5dff55dab0d940153a7b0fcdd333a14ddc4296478df01a4aa6d8414df98caad20620c3204be20236ed9c8e569a9406f459a759c1606a81edc67c2fb01ca0152ef3e3c92784f235b3c58109097327dc6779713a76b394c7dae4cf2da846d040345ea407486924554353f3f142e837c0854e2029c4df0e36d07d2ea496d7c987c412c9965649749a5ebb92e1a30c5fa54cc6d2b46972e579b222d507019ffa803459459e5677f21de8b81e37e085016df33a21cd793186d8395bee59a160d76c515de43f67afbdfd11062c26bca4ce28f5da9ba18891b4091e8385efaf25ca1fcc68d2cb3a8aa9dff69b313cd81f40134741a4fb15e93d1e79d9e54323986a0f36c1e944144602c069db76adf50cdd0d499dc6ff061bf9e9bb634db10deadfd39b807998bfc77b25f01b70554926ab426be6e55ecb7f5982cdebe461650748d6f449b088679c3beda959314f9a321e5da08bc9120e89d988291407870bcc39bbfbfb8fc428102de4cd58fbefdb2a9f447802342e1c1669987af5452242d11315dfa84bd4b0db2e9c5548ad200c5e7ce8d54561c2a5beb3998ac87596612b9f9aaed45fc97eaba3340a64f6f31d4ddc0eac9ac2c1837bfce7b2fa9f1309affd6d593c9d7bc25b4b6359a94230935318b86860677d0d0273b105c5dfab3ca17c867ff8e9a8bd152b423e9c8444caf5df3616597b7862d17484e6f40a37064f528ee6f86a23e98214e4f41fbd43ce1701f4b9877a3eaa3d5fca92d7ab8a1c05038a8af52285b6b4e728ee58dccb6fbbe154cebc8a78d2127a6e0ad912ab8af8cfc23293fd9f1c63b2d91d0ea088686e1354a6628fe7a8e1ab8552144b5643647fd9672f605e0535b83f4572c06ebf7ec222a0a08239d41664b2cc98628026c9292f9d703cb3fa189de73e39584fdebf0f877393771bac51c498866184f92889ac1caf3a206491dac8e63d3db50f853820424fc9d47b42727773fc13c3a34da672913f95fbcefc870177ab3759914d2f1d3dcaee34e862f0e0e82556f91965348374412225c3234db2610ed202512d77690b655c4eab290fd7c1f9fe5966f4b3abf47b558ae2feeb15a88dc7f444b27021907521403b5a2fc021df454079d745e4ec05883249c8ae9dd04b37fe8fe9fa31218c7b98762c0ac9a91176e30632395cde68cb35ac55d9e8c31af544f39e57904cbdd42d1289c4f50e0ae89cb8df1031b4c1e19e142a034e49b9b6967eae6802948ab4b22ef7948dacc97a0b1df55184e77bdce63b31ea88fc23f1e384f5b3e26058876cca261c42c305f8b6658a5780a35cc64e06ab3746419df6615ab37f4f038c91d04a9f6328ad0fb31cc04f2b81548ee46aa3a0ffd242e107fb54ea3dd087f6b66a2493edc4985f2b8a19b3c69befb68ec8de13e0fd6e1edea9ee8e98e8c09af0b3e2284a79cfb753ee8bf0700cb3c26c0c3465eeb7332ce6e26ff449c63dbb2fc8cc77ad81d75b565ed9f89f3833d626df48f0ead248f8653603094246dd79421e56517ee442ae714aae56f748dc3b9b58ff1dff933d73ab11b834106c5dc3af508d90970e8df71db3387121b27ecd5ac2b5d933b63ebcd5b44a6246e1ae2a931d9a3528fdacb01807d10a8c37e663248dee3777154e848ca5c5bddd0fc3079e459de3d0a38d7a82a708c4c3af0baadcf4418dd628845270e6aad9da82230eeed5e2678785c9a71ed28bc62b7cd0538a68345a2a9efb2444c90615a77f62bfdb2cd3798e0fa31ac14b5b78865650c4f9fc4394d87e55ec15f23c43767dcd8b44e98708e7a08829522ee5399f8fd7b58e6b219da30d9cab6549fa46ca62b2ecba75a32beb20c3cfa3bc6cc71ebb20db8b7ca2781c531f3abdb06041d00d8a2fee29461a663c1138c7fe5257bffe19eb89ca93bb278ab8358d172f3d05fd0d3a9a3d981a14ef3e823feffac625713b520cb9e46134e416b8394ad7417dc3fe7df9df7f4c9553ebb18fd0078fcaf0485e4b68592568a0f75f6b06f27bb65daa5a9bfa71f6433e09189d292f1ac606faf9116d9b7a825f175178338494fe8076c85c9c7ad6ac4391ec39c6a646c0d3515c91301295f61043543925a25fa07832374e9ec66c3dfb6a3e36ea4999bd90258a9fbb6401e1179020cd5069b7ed3f3221780559f818c24c0112771cfbd356e16916da52025663bb1ba05b32490e209644b360093fa2880ab4895f65778e6156a894a1767ba6b32f1b6d7569f514e49462bde9a690eb6cbdc2f19305f6b092b07c701638d7021abb8dbd362217131a25c268f3759f6c4e752b41bd0270fe8f7b33a95ff280e20defbfd2762f361d6f492514192766bb485f963c9c6d778cdfecc4ceeed0354ab063b6bf1183e214318455868757e2858a09a051680399bc4d781b4c3ddbd6e9e964b87eb06d510ad53194fc8cb6cbaf20dd65fdbe7ceb6263b378678483dd692eb8ac96159d264c12c46bbcc07007abd84fcaa693742ed9c9c8278ac3f30dbd8c561e0cee8f0371758a9807b589f686a19bbd5895575a9d45f4b6d7bd155113b2ced6e4c39dccf7569001f436832684ccd4ed3468402909bb058585c3be30adf96aa18513a60fc28517e7fad8218ec192edc2c32f0a8e79fe59537492ebdf2ac321934588566a72e5a980332ccaa6770a3e9408a09563f9d1c426d4b4873116712e3b6c8b6342904e66883b0cb84f501b94cac1b8502b7f1cb0e69242a93e259cc1545b292c9befe63562d99b08c1862a4e61284293267b8badb25bf33ced9c429bd42691c52c43cfe3ac52487ab1591be089068bc96f181ea942dc78468c6059a5a63e18a0c08157c66e98d63381d6351b5d2b7d8e4a276960206f5980221661d48930df974ede6c0089772e5c55192044d39087c331217e0502e983efbbcc8029b47b0f67fa2c34de224c2bcaf9c6384d76b4ccc5c46d01d7b614a157c42ce4394fb9c8e43f3182e857a2a35c53e48a45168af9bb3e5817febeb941591c5fcef2ae6336067435b0aa8f18632f22313c0e0d8a618e74d27064534b683492f029fa65297af5fada5255816410e14f296b25f10aca9e3c6ab8f927de26ac1004c7678ae1cb93923a3dfa60fd36262ed6e589cce545eef8f6455a30b120f2b7d924adb0dfbae6f7a02e543f1a04c79393966c40f21d7c316e3ae2ac7bbfc7c235661cad714882db34ea42a2423277c21f0b881223cd926e8e567dafff261dc4479880ffd4ee4c91dc6aee9e95d622b3e086be1812d405239c0b8c743e30d9f903efdcbea6b8d274e5f8bda4358c9ae9dbb2cb05fddb4cfccafab811f1437d8e66df1f93dac3664966b4d9b4412bdb773e7447bf3764649e58685c5270b83db24ce4adf9f34bffe8cfd8fd6cb34e0945cb6e2457b0f6337cc6a9759a3bbc892b786db49103db56e00913d2be0fd178b0d945ffdcef61696a4eb9f778bbbdfbe134cfd2f15b8ee299a90a00ef0100f43354fced41fa9a1a7544f10f1f52dba33966d40ce7a52a84bad556cff10117f91af471448e125eaa64ae1d6a328da319e9a7aaeddbff8ab18d382cc8acb597e87276cfc4819cffc0206631aff1d2eaaf706302f5bbb88d233962d1ff8aa9cec1113c613297945acb3bf64bedebb6e5d2c7cf0ee076978b089e171879ba9f17a3250092f0943287c7ab7339d4fe16ab89f5e53a77f7ccbd91a3168ab6644c6a70a7f9dfc543821eddcd25a13a6b03729d40938ba9a39d9d375e82842a1445eb91f302fbf2da4422778be2bdabe8c7a523782bf7f47d7a1b90c2782d152000eb452ed96f5a5b18a4b2e0e432a32d4b2d60c1c12f669f34a8a2165d4b8b05247f4361ca2b758c12227e4df07559d1a192e5330e24cb4175e3482ab99481a755774b040dd3a7606de9475017c0dc9dd0541ce3623727b24abfff2daf45a44450de152d31a32068faa4cc06bdf35f03f84eaadb0be6e66de853f2f1e06457d4cb3dd0927cf54750369c077fd11d388d1ed28d8172fc0f0caacbd473d8628740edf68734eb5214caa3cb87a120c0832e8c7303840085f788959f2415a531c5ea2ef9a047450081fb1ab904bcef7c080d78ec15eb9acb1de7b5b38b208e15bd3a786c48bbe877796d98bec205c7a7ddce34566537aea3062f20e5dfa89b693dad1536282addb36686dfeb118f2906309ffbefa4a8e68e510c6087afd3f1530ce1528a2863c5a942c5be8d610298241b5a89523ebb29a3752e4ad6f409719086d0c83c2776418713c304ca79582c2c9d9e9a5297fb29b7d149ef26f685be96f662c7cf38ded6b06ceaa0bed86f60a1e7ed762632e4908287c10d2f232eaa7a0a66381a4391b643e4831b3457b1131daa4a9cf1fbca998cf7cd73280c17ce0898478856812beeb7154904859f06f1139b13ea7a2fda29da698bd65a73d79bcfb386a98ccb8afb9b2631bf21ed62034ddd4e6e3ae11e3e0807c79095de0ad492a5458ce3be4476d1762528dc2516efa9c5facdb66e5e0dbe156a082d50c11e5814ce352f1bf64e7f1bd72875f01d71d9f9dfbd54f6b2b79b8c3a7447c77b82db77c1791714c3f7f3b6db0d420bf3398ad35ae0fd3f50c8d716d39342cd07f294f9207dee28ab3236694967d17abffb65a387a9f9263f0a52d9d94ed7efed96f0be6c9682bfed805b0035ca2017af3ffb18b0d20fd3799a60d3200b7a9bbeebd892544030870a5d01d4a9d055ef34544d3da602432289f1cbcf43ab8ecac9a5e2c2a2b9da2dd8273657060abbe9e3a82f45dc9829988b27f39c4bb8c64f6b87aea1c0792e606e2afa1923141eeee4f3d431a78543fb31eba00220b8f4c91bdb6e6ce651eca78279debd56bad25d9b8ed1274035042bb5a17ed68453866d8d62d994762bf64ec56e4022fab096c1a229a0554fba72bb0ad77cffd0178982ad63701d6f07dcfd7ab12b8184c7632f5e21bb9fc608093558fff03b2e6be98e748bffff9c30480f62d412c8803aa80afc2246043eccb8648f477319e73f52e7a46fd71be8dcaba6094f4367810d4da9fce93c0e06d28b56ed9d4c6a255b8bedc0994e25fd74b5001857b93cdfeb63581a31b8701d3601f1f056a26418fa03c71b5441935da7927682c0ebed7af06f5f06464367a14b7990dc491eadaead1da790de3fea7cf23a25ecd7d518609406044c69912c6b8d37b8ca7a762371e45de1c0ef8efb326ef06a1eb56904c9299dcb183eff1dfe4bc1f9c61ef7b8dd4973840485d0d665bf546f18e941b6da0e70e256e3acdea641d096e2d4c05b8f47325df54753a29c9e0ec98d012b2862c6f49e62177f4c2884d7e25245c90f1b7c6c485578dbb79bc353a3942831241f76a11ebbe87a22b3d3c86c81c01c858185cd2b9a65422ef15f65cb393c43e7b2d8ea64a8afb74b473f9f35a13b3be805ec1cb701be4b37efcb5ee7082d0768edf4f3bf051f2eb9ae7a4caff550c572f9ecdbc18ce7db8124c0b69119fdcb016d185a5ce43c4a08e4160002dd5b3d5b00c64c02e1aa79c121cdb95625385e117f34e8d96c4b31cb8cf6aa544971530134be79d5b8b0dc7fdd41d66681035e9a599e1748f0997d8bb76789252d20cd0477f9ff53bc1fa7b53933d805c0cc972ce5064e2bbdd201ec6ea359917d4a831ba83db45c2b741f221af4be21764da13e0da029415dc0a0cb7b8821fad08bfcc1651b44ff41f79f94e3869446228113f26d08555bee63ecc3693cc713657783917510b948b9f13190ea7923dadbcee066c683a0ef25a99135e96594b652233d4f07ea8ae1005c98e116d13fe26735780a11530805d6b2dfc0f43ef565c24dea37ba3556f8dbe43ac57e2c395c60c0dc56819f21605230083e7f789a0ecef9421cb4fccc4aee529baebfead1f98eaf1a89566310dc6806c04d654877fdf4154cb04254062c5fc7c2e10b73a11d36017ccf7748d2ee35679e16b4904a67838e78f32e4f56c66f5585ce0d871c70c92201cd7f533c7e6823c1e7219cf9ade6bd7f87585e5eb4946ed0a359050ab1528cbeb045387bdabeb2897de94cfe1d5be70a3116cf5dbbdbafe44d349f963c5298f74bfcb3ca2ce8b11fabaa3b24a876759b55c52f1e0fa1f188bc0940b985a2c1736713c9a41a233cfd9ddf64299c62361021711af7c9fe1d5ad300393b627fd049bff58318fdd3554b90f21aea41b4df9dff98ae0263ad47f4d126c48311ac746b7b63a6e5f4b3d13aec9f94b60ecfd8221fbcadf19311ab394c9625a3097c4631f7afeeeeea8c243ede82295c068bd74e31411f9e4977fc104533ebcf6a1eac974c75e76a645a8c6e8f4ab8193e9cf20638fda2ec43c3cb06905e27ea3d1a8286255f32ccd91a445873e33d3df775d95af53f83f349bdcd4d43009f618674a7b72eb5ee314459130c5c75f9fbd39e6f9667b504b78f1b48e56542c079a6990614667df6623d7570143fefd953d803a5cb1d1e45b1ae34d3963a613257dbe245c4212ecb48cf5d526829bc9fe4e505n;
var d = (m - c) * ainv % m;
var lcg = (n) => {
  return (n * a + c) % m;
};
var unlcg = (n) => {
  return (n * ainv + d) % m;
};

// <stdin>
var meterUnits = 1n << 16n;
var rowSize = 5n;
var totalRows = (totalBanners + rowSize - 1n) / rowSize;
var firstRow = 0n;
var lastRow = 0n;
var currentRow = 0n;
var spawnRow = (row, position) => {
  for (let i = 0n; i < rowSize; i++) {
    const n = row * rowSize + i;
    const banners = document.querySelector("#banners");
    const link = document.createElement("a");
    link.href = `${imageBaseUrl}/${n.toString(16)}`;
    link.target = "_blank";
    const canvas = document.createElement("canvas");
    canvas.id = `x${n.toString(16)}`;
    canvas.width = width;
    canvas.height = height;
    link.append(canvas);
    banners.append(link);
    render(n);
  }
};
var setVisibilities = () => {
  document.querySelector("article").hidden = firstRow !== 0n;
  document.querySelector("#top").hidden = firstRow === 0n;
  document.querySelector("#bottom").hidden = lastRow === totalRows - 1n;
};
var goto = (n) => {
  const row = n / rowSize;
  firstRow = row;
  lastRow = row - 1n;
  const banners = document.querySelector("#banners");
  [...banners.childNodes].forEach((child) => banners.removeChild(child));
  fillBottom();
};
var render = (n) => {
  const id = `#x${n.toString(16)}`;
  const canvas = document.querySelector(id);
  const ctx = canvas.getContext("2d");
  let bits = lcg(n);
  let hex = bits.toString(16);
  const data = ctx.createImageData(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = y * width + x;
      data.data[i * 4] = parseInt(hex.substring(i * 6, i * 6 + 2), 16);
      data.data[i * 4 + 1] = parseInt(hex.substring(i * 6 + 2, i * 6 + 4), 16);
      data.data[i * 4 + 2] = parseInt(hex.substring(i * 6 + 4, i * 6 + 6), 16);
      data.data[i * 4 + 3] = 255;
    }
  }
  ctx.putImageData(data, 0, 0);
};
var setMeter = (n) => {
  const row = n / rowSize;
  currentRow = row;
  const meter = document.querySelector("meter");
  const meterValue = row * meterUnits / totalBanners;
  meter.value = Number(meterValue);
};
var leewayPixels = 800;
var spawnableRows = (q) => {
  const e = document.querySelector(q);
  const rect = e.getBoundingClientRect();
  const main = document.querySelector("main");
  return Math.ceil((main.clientHeight + leewayPixels - rect.top) / height);
};
var fillBottom = () => {
  const rows = spawnableRows("#bottom");
  for (let i = 0n; i < rows && lastRow < totalRows - 1n; i++) {
    lastRow += 1n;
    spawnRow(lastRow, "bottom");
  }
  setMeter(lastRow);
  setVisibilities();
};
spawnRow(0n, "bottom");
fillBottom();
history.scrollRestoration = "manual";
var debounced = false;
document.querySelector("main")?.addEventListener("scroll", () => {
  if (!debounced) {
    fillBottom();
    debounced = true;
    setTimeout(() => {
      debounced = false;
      fillBottom();
    }, 100);
  }
});
document.querySelector("#jump")?.addEventListener("click", () => {
  const target = document.querySelector("#goto");
  const value = BigInt(target.value);
  if (value >= totalBanners) {
    console.log("kissa");
  } else {
    goto(value);
  }
});
document.querySelector("#search")?.addEventListener("click", () => {
  const input = document.querySelector("#image");
  const file = input.files ? input.files[0] : null;
  if (file) {
    window.createImageBitmap(file).then((bitmap) => {
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(bitmap, 0, 0);
      const pixels = ctx.getImageData(0, 0, width, height);
      const hex = ["0x"];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = y * width + x;
          const r = pixels.data[i * 4];
          const g = pixels.data[i * 4 + 1];
          const b = pixels.data[i * 4 + 2];
          hex.push(
            r.toString(16).padStart(2, "0"),
            g.toString(16).padStart(2, "0"),
            b.toString(16).padStart(2, "0")
          );
        }
      }
      const n = unlcg(BigInt(hex.join("")));
      goto(n);
      setMeter(n);
    });
  }
});
document.querySelector("#scroll")?.addEventListener("click", () => goto(0n));
