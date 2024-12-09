import { bannersPerPage as bannersPerPageN, pageBaseUrl, imageBaseUrl } from '@params';
const bannersPerPage = BigInt(bannersPerPageN);

// Dynamic scroll experiment
const imageWidth = 88;
const imageHeight = 31;
const rgbBits = 8 + 8 + 8;
const totalBits = imageWidth * imageHeight * rgbBits;
const totalBanners = 1n << BigInt(totalBits);
const totalPages = totalBanners / bannersPerPage;
// detect bad params
if (totalPages * bannersPerPage !== totalBanners) {
    console.log(`Pick a power of 2 for bannersPerPage, it's ${bannersPerPage}`);
}

// Global state
let currentPage = 0n;
let firstLoadedPage = 0n;
let lastLoadedPage = 0n;

const loadNewPage = (pageNumber: bigint, position: 'before' | 'after') => {
    const section = document.querySelector('section');
    if (section) {
        for (let offset = 0n; offset < bannersPerPage; offset++) {
            const num = pageNumber * bannersPerPage + offset;
            
            const link = document.createElement('a');
            link.setAttribute('href', `${pageBaseUrl}#${num}`);
            link.setAttribute('id', num.toString());
            
            const img = document.createElement('img');
            img.setAttribute('src', `${imageBaseUrl}/${num}`);
            img.setAttribute('width', imageWidth.toString());
            img.setAttribute('height', imageHeight.toString());
            img.setAttribute('loading', 'lazy');
            
            link.append(img);
            section.append(link);
        }
    }
}

// randomly selected coefficients satisfying the Hull-Dobell theorem
// ~> m, c coprime (m power of 2 and c odd)
// ~> a-1 divisible by prime factors of m (m power of 2 => a odd)
// ~> a-1 divisible by 4 if m divisible by 4 (m divisible by 4 => a = 1 mod 4)
const m = totalBanners;
const a = ((totalBanners - 3n ** 42500n) | 0b11n) ^ 0b10n;
const c = (totalBanners - 5n ** 30000n) | 1n;
// precomputed modular inverse
const ainv = 0xfaab63b3bab742096dedcb4f433ba1f647154933cc9169228aa4644d0bd6b8c9ae5e7219b68e885ee918cadf2d4b5b40fc2b4470c61e5c7cf661ef0e7c81c74834dad3cc4d8cd242c0021805651a1ae594bd99e84796797cf0797a37c394da02a754ca4c7003a1ea3741f0dfe65944cccd333bcb8c012188c403739305c63e891c0670ee6f755ab278bd9e371611bb55882b5ffa552dcf8c683593f53ab23b580320cac796c75b92c0c5335ef9d1bc79b94a7c00177e459643fd1229238db6423287e459196f1f077f5bc1d6194558f552410194a6e6d832d22613d2c2081b8f0f971a5b1e428548e0251b0ca8adc69d20432cbc647adce3d6951f0d98e43feace9ab6a6a0681ad054efc2ea40d039286a1b1b1e276fdf06f99e95f7ebbe8e306acff7c4c4c38d7efde9b344b4ea22d91decbce301c87feee1aaf34202bb0c338357510cf70478163e497a285b0591da21391c7fa4f4f46494f9d9a6c39852bd80d6baa37b65455eb6f839d0188327883e6bca533fa4d893a8692f155efc742e0b3a859d8a732cd6fb5856f2e8b9d66940819885b3c1f663b6c8ae47c2934cf9bb49ba5f07f75a1b0ea28393dac22813ec316f833c9be9a0b4d6567f12b66b58721abb4965080778f9388b4ef1b94c4f3e18819722004b0692d046333d409d34f766569cf1ba334715e800ad9763d9426297938eabf248e741725ba485f15633c7a2f582c8dccbc7b80c270b39c8e7f867ba0afb8aa812c77851523643cf97532b40d03a83d6821def1767fe57b1398936841d3f7b26779c465602550610cd91cb834f1879b945a8dd5984be44caf77b214553f029a134e486ca4875a4e3aee32b8be2ea2c0335c3438ea5550dc695f4aa2a087a3d4c746c862901e804e7dd67384c4f84a9285507a5fd9f0525cb73c3a1b299f4e61f59f1a8d9f7b9800b9fdda9dd45cebc63c16784d1f2a604aed294378448cd41da3150e1fbc1ceb218b443d03a234f9853a815d490fa642dae558110f91e5e9f447a98eda212385cb7d0ba9fd8ed82c06675f9d7f62da175723d45adbf94874e35d5fd8a36d85d3512175e2c6e25486f14949ab147e888c61573d52aced973a43cc82526d597ddaab00d6ac0265ec05bf5a0d2e718415b983b049a4263eb023e8cee585b89982afd9224916ba661898301808e37ccfeac914956ab12baba327c623ff34f703b5f945e78b1dd4788d145888b9746dd2c21c5f66a78c5dcb3e370bd19f0594ac3ec2b81c31eec74ebfc93a22e921fe65e448e8b20c919d14d10b68d0fbcb2d1173c4e8b9be5788bb0d5de06060357beb800edffbc1595d10d87be175ae87a7be18e4d879b7bc5d29bb12c8d5dfede1823869c45f699cf765dcebc80c35cb9da3aa7bb127aaf5794b4f8b9d2107c10302468f13c8be0834a99f36717c21eab13887c8315ad66e727ad9a226beeaad1594cc61447422ba932e3cedd4163cd1ae83e4e1e27f05ba8907d3ee0050f92fa8486e4a357327ce31407c5020b04f6835aa129d90bda0e3277da28d17325440fe5282e0ed1a97fd65cf99196616843b2d9ece9e4f31501582c86313ee515947c4650eb02793a31a3e3defee4565a0951f430692908d83c44515b5f6834f94fd776c5a8a6cb46e0ad8173fbcf38afb9f198cece13a0998be2ddaf66af7d79d8c8e8854ec50edabc11251f43f151e9aeac57da8cdaa9b9894491cc0439c24e19dcd76af8b692f936f73b2741683cd0dcd8444a59820ca50a00679323122af8972b69350ddb46fa414e0b9ff6143a9217a648bca7bd75fc7d5bffb7b22771ca5e9d90f17670f259a0d276f485a068db1f0743799fd5855a5836becf674b59894130f8ac398016cf2ed2684ad1b293adf6fd8d324e25fa5ca64b8731f43e2a7c3d33b354fcd37ee4e8c77634ea365dbf42b85f596a6a7978d3b9e1908799922e2871bcf0e8a46740facb2164c19391e41c626386b14718df569c05a12e530584151a5178f2c926c64a09594d9d90174b2d2882039e256e635e088c142fdc12069c1bf316c862ac7b287b002155dfa6b5747b97826d24074a491caaa78aa65627699e9d7f8e3e64a6c6330fdb74f8667ad585137833802d445b606d392f7a246dc62e2550d822547877e883216606aa48972d5cb3d1f1261229c9eb2a744c5638fb9edb2ddc1276b8f64d587ebad1eef56f3057d86e8282dfdc06588624839208edbbab6d2df2c434eb7bc1504e1ed4305852348747443c1db74b6aa4481870dd212b4cf08d7c02039e6ec6d24a98194a91238f812be9dcf5ff492879afa78cced4d97d77681dc7466c6554973dd6cf5550e85666f42ee3180edc675093159e9a3f1cd0cc968e1b67384970955cfca06b71ac14c0be02b7ef568181487e73acad83aa6817df5ae5568a116e55fa9c0486bc722b8f362a3332b72d075408f956f55f80cb90c70a4c1951ebf250cf072b330c45881f661a1bd0aee356ed017ef2d66e848c3021506e6b527fbe46fa8ab0bcfce92bf1045fe41c4f91a3608c295bc30460c645cc5719b32c137e0f3b6d178eff735bb5e97b3690acfce293b7f6cecec532d19bbbf1936b279c5f4212d2a7a5b5a3fc5bb3afd9bcdd9e19432e3cbd2fa62a4848190109d349ddd9e2e50ab3b87372d119f6f481e5745416c566a2190c90b74e76192dcffa2745f9e74f07345070e3dc18e3bf41bd57108de7b884d2c4d09515bc3110715e68f7408b76d36de1cf8d68be212556f81852768341721ba503eb5d852152eb80df31581972f7953eb94fb069cf337f767dfd8a3d3aae393a327d3802f77e8dba365e06b83faccc493748599356d145e0c09e0f18dad21fbce9b8afe53615af7828eb8c55331476a45e796f5990faf55763b9ae99b344896f223977d4c06cdbdb877de89b58ec22318f4481f4b73a3fec50d0cceaae4cb99f2aba9aa4211293f78f73d7147aba49c3a7d69da4e4c9fac28a80e826ad079347eea4e19c805f7a0e87f34583aa0ae486488fc90472846d1b0c5afa85994028e9fa10c0f079569388e3293290ab87d93ea1772f15780cb59d811003f1c00582d30c2b1065c3205439d5e2aa3aba73474d2238afe52614ae487ff0c168c80e33b3ddc2c7346fdca52a68c9fbdd4e4e761c1e29621503aaf2f2863fa9301d4281090d1b7cbf5cb40f9618406755373c0f8731f384ac5bd7c5c71da85b37089e95f2fa575b3279a64f34c37b9662d2c77329352d530c2734e2fe71e55b2166a5aa6e0692c8b2a607056a216f3c40aba85e6a0a207f7eeeca5c7208848856bca62c952728831f2a3d996b03456b059528224d5c787365c5098ec636c99ef14da96caef0f394f7580188e8a34e11e39bfa63d10cf7df9d29ae0e0d330a1fa7afd75fafe299ee3b28d0969146d1dcf984d79f31fe65da49c408191c74e66f72242361351768eb3da24bd54a16119786ee7a1b3c4ce561f85a29399e61c24c44c9caf8c66bb6825645515754cf5e4ff264bda7250e764ea3d292fd307eb459a62586e430754989ef78f07834e0021750a6dc49321c163007a009a6a496678ed1a0ddc2d63bb69e9c51fdf85c84b34982c4419652983fe7507629f527914fb2cb488fe93bc7f13a7364e6226a2af495a3afeac5f85c4c341610e3df5e133de0fb50ffd74cfb5b7faf59d50157907468cc34712d102108c8c8f23d88b6b6003aaeff6c56dbf1f089a0f5e3511c23d49d3ba71de4b26ab347769dd3b14ad768c60dd8685aa01040e768585a24bc2089a8ffb0f45bb538ca0f6b191ae313e0d69424ec6ff4dc81c80b3d082a26e79974ba287f9e4812d3321471f3c54ee7bc2c0a33b5a0512fe0fcebfbd4a81e3861c4762f7165e465a0ebcd104ad82eebfb85904dab4d18e87c80fcfbc6fd8e92c30881b7c6b72c684e1274b6a338848ea8a40831479f199dfa00d96b62bb01a01f8bb94fbf935b14379b7856c51e7d768b62496f42b2ec17fa090f735c963f83781443a93da717e1e117dad8940c93b89c3ce901aabc673b585dce8dedace104a82c78f5cd113d5572ba593d2380d6419c7d5e4796c198fd6155a2c6bcaad4b4734ebfd7df60a71fcde9843d876a56c773b088a5a61c3fb97b6915e11088becd0f46ade3c33703cda8bc7a2ebe5bf54cb43f773569c623a1c5909c3f61d4d4afd1d3c16529ab545919431be59205e9f6b9ea7e6f4e088ae59ec0bda290a45a8b56144421fd6191b7ffdefc693625d56a7620e1d65054f671a7c2236ad3d58e024b445c76f90a929b30004b01f02bcd5ee2b937032f7d80ec0aa44297eaa79ccc7894c4f0efd8d961b8779cd57da8e46f30fabdb3b36725acd8452872389221274daa28f3f37939780d2c24bab75c4b7c59e4168e44bddaa742dbe0f297bae9b8d44bfaafb9261f1773e1e02a388992629ebf73bbc38d117762619ac03a61ffeb1f695714a51808450abff5564aff8c60b53ae2d43ade8faa8948f6a3ece8e74b5da5b1480534fbfb802033a04d5113ac506f8690ecebaae7f889936266f4cbce724113ae8f5ed755ad4325a5b26e336d41cce13a17680b4d76f28f02d4138234bc94da0ad5b841e40972bc39a909bf093f094f94ef9ec1bd0b2d2a68c7c5955deafa4f78da4696f5de26ca4f9cd1f4d714beaff47a0f541cbd9f99b4d596d4e57dbd5cdfd4c15b0ee46e8305ba05ba2cc78375049a22ce618a8a865c5fbd0e2eeafa49af0808946093db3565d0a17ce9ab253dd6d63e9d0ffc80aae130a692e6b46b0a5fc97671b3e4cb065ffc08312fab26f78820b43d0bd0afa59631c104077245a00ad059f4d2c7ec2a738845ae8296b737595a12f1d3f2e2ced6d4e5ff7faf85c3f9b32559481d46c2e7f974947783f79ad793b609c195ef4d6335baf364b39ac4438cb7dd101dc35545ab9a71f017d7a6bf01ea304cb8e8676104eac08797ab3e44f0f6b5a0fb6461f72adca2e80fca39bba19514a4bf4eaa281493d9b2a72d754b19d09a1b187d3942950e934fd839679fd872c9b603b6e8d1a6160b36b683767b6123d61a1f4851cb34a48af7158266a26650e7a73a76d223987b45ddebc7929dbb52fb328b6ffc1f06e4c642fe7d0804ea7086d0a8150a039ab5721c6623c2fb54a48461d533a6667f5e1f144d22beabd6b53bbb497c09dc180927499c4ab1a5c80e1484742a2a940def0b60a641d846b7b1c39978e6c6264a928c8861a6755e8051d9057433fffe9d4ea9f70943e7c5c7980486713cd235cb2e15608ee9bbbb38faa1f578d55f28f5a71fd75286b51040ac989ae885e6b66a8c15a6f5e2a22b15342d0c10329f5110d30121232cd875c6b40af1c67e971f2bdec5bfe9664bdecec0f4ca593058797038d50380351f0d40c1c176ee563b568dd9da493420acc6e8a9c9e27adde5f18163849ba097995d94250eea927554cca2cbe3c416ec7d4c32259bb59859d43503da32b61c785df8bc62e2c62f0701231b3a3d4e0a5410c1a9030feb8d22cda3a774c10d6f905ce422e7a61485f86c061146a6333964238cd8f3ad38002fd17d0f2892d04f0a6274abd8390303d4a9f2da98d37e6350ceb8a754e95c0857b2783deb8ea91242748b013e480765efaaccc4061334ab51a86eaa19366c98c35760ed07c1327c9be0ca0f269df4fed516434355c9716e417474ee8c56bd144dcb4b4545b4a2a7220e95788542e0cefda112067e660da50cfdfeeeaea044ccc9dfe9bd85dbc386993860025f7dd1bef4cee0664c969a58469c17d667b8c3dfc497ee21258c105fda4afd6ca6595e222b7b80d3409db6a29e5845d28bf9d344d98218b35d71eef4d018415e1fca56fb4382a68bfbf1b3d9382437b35b9af8b074bf71c8349f8d4c199ebaf76bf7dabf46e235c226f93ce45523bd40faff0f84cf57d89a8159873b45bf94b587a60ae0db65ac56cfcdc443409a0cd2a40790200b03774763ef7f58db99b1994e48211c851c7cd62a1f2d610b81e5da0cd2ef98ac36bdfafa8f9b0f723dbefc1c3dccd124234c9ef1fb718fb06feb8cb8d18756c6bf3f376bf99010f6eac9b579a2e087ca7c20eb85f47d44d14bd6f6f7102fb963a4c20be4c3ef70273b7381e2ea1cc51153bf8e53eca542fcd32b9222965c7ab5a7c832ad336188d544b3b7949459ef9ec938679f6341e0cdd41ae6b56f8a575184ce34554d1051e0e15d373df7db641cb0a750e020c05e44dffecb13d5d7ebc3d6fc0f8479b24b9c1c1c2be3ad4338f3bece01c73fb69903dba72a1a773b2335470a05befd032ba390644cdbd41c0e1cdce4f1b0d765f0fef8bba88de31476741e6aa667c5b1a4f6959d95d35d9b89482e7a368c6f80ff237287e8b2e26db7bc3c6904d31e01b21d84c309ff1b6d6020ede55581e005a989988beb316d6ff9e9844f4be454d0f37a15f3d6e6a4ac7ba2a07d8b5de6a138ec472d69bb4640bfb7f3b4908e26ccd61be4ef330db8c0987a770e0530efc958d680587f5340c71dd1a86c06e1f538b64e51966167e59bf2db214ffb0bd44c5c3ed035352b08b2d65bba4af379c5e04157cd9b3b11f40424465470b219da636b790e095d9cfaf32a12ca9eb34d022564857e3913e88a86586c15b1f8a8b7daba27a0e1c56f40b83bccb6533f5b3f53387cd738324cd998cf8c636039c631bd1a306379b714bb197ad5f3b07b0f2dc7eff322ce873b3294444cb073e13de3df1cf3b6c2819e7468773eb8d0c38a156a9f814cba16479065ea32720918eb933a47c50c6e7e3cd6c0c2dcb56f68bd297a4c6b80a3f858496b02c537502cc8016fc2b4116383b740ab942f0e4ffaf164f8d3da75b0b1b7bbe9aa08c65179aa13ca263fa944c883cfc23ba7f90ae81ebc8c8125ceff8d27cb5985dc7cd0873f34839f832582afe688fe98bba1b8c0c1e180ce3799648461581ccf232b5fc9c696e08f6b94ef97d09c751319bb7c9e131693711879ca6f36a5f45ddc99d8f8c0f11e1a454b5e83f9311c55d2541d98840e89fda901a3dc57c66a4d53eb4f1bc9bda13324746924d2407ed8c74c875eb6259518d36dd5e613016d0259800d92664a1384eb107199f2e02d8a672814df0db9da33a6052420f22d1081715b2ed6d50e4c05afd34d596830aef458be7c26863780011dc1aed7080f63e4ac649b84e459264642f80b256bf88e95218743306786ad4ed91c8d9bda3d32f4a3ec4b98d7878fbbf1224eb49ab3f9025863629ac5d346c9e48baa66befefe3d4f52c6f45a73fbb28c4f89e477e83cc2f7361f7461ef5c390950a7ff4ff581115617e16b1464250a35df62da0b864f6093eda0fe6efef19275c2eba84fc379177d82afb27b483ef1f8647433ec58b6c206432fa8906c3568f5e88664a5fd98934ac7515ca7fa306c813de9bd86fdf852cda5f0feab00ce8d26e04a5f213a38e08941e0f40b0ca7bb2441fa748cede94132abaccd24641bbdc442f16bf98dbed1d327ba0b6b7b77ed7a49dad385dc431315b72a9b4c3ed43d0bc6890b87368dcca76d2624a26a2e2568047cba843171429a0e2252b8b5be32e032aafb7e26376c1de8525f681370ecd6be44b3a2d34df73685bc31491538088f01568b42087840beb0d9ddf2f4c4986fb6b7fb2d299cc3456f051880d878d1370a38578bccb8598aba555366107fd007f9e9765d0449d219b14ff31719763ca0fe2276497fddbb99cd3b45c22883a9b7c8a9b40a3b0574fe07635dd94378790549f1fb94d1a822ce5be249eb5d5b005bbda35af11889c133993c17023bc16013533f6b5f40b17b4a27ae79be23445b9d1be2b212f62e6707492bf906ae135fab0eb028d570a4fd672ced3df7e153b0597242e210a570814a13eef3f4da6104d73ad3d7f06ae526eb15d318d91984a277ffe6ce760101b242d402a29ed9a09e01d8e16517ee9f0177adcd288f29b3fdd4b5479e1b84a29ae344caf617a5de55e56adc4c131a3451c4c42b9d619bb1d72d8d2b0b05b8476a15476f207fae90f6767a7f48fb8aeaecfaa931434dd5de6a9fc879217eeb4488d3c5c7a3d2466ac97b77b525505ee8dee32555d31d3b0480c040d08e4381fb3a0f5c5e51a163b7da7b133f528a502ad729d1ad33dcb321a1c5e0c6043e82f2443a4981b005d65070f8a9cbc376eaf506fa85188990738271343805ca7211521ee8a2778cfde5cc9b5ba9bed208e6cf539d8bbedfaa9f9d7fa73310cafa5dd6c09b0ad3a1ed5fdb9f01b8bcffa59ccadba25ab9cb8b51fef3da96d4213f80fb32ab38f247a22e3bfa5f4ebcdd4ed4790edc29649a74a1ad6ad51046e0953a1d59fa8c68c78e83582a4c8c490b715918d7b9b80fb63c6a666da56427a1e25fa9e614c90acd87878bdaa27ce50b2d90aab445afa0d07090ca1b75753229c4b454bb99d848ac7fe32d60942a115afaa22663c018472a5fe3458e0f01f97f79d84cf4e7e3c8add578e4e90c97e838e5333b25bfb4ca95d4bf4eecbdddb57d953a0009026843b7a35f4d7a8924e18dfbf236f365263995e6527ce28dd642f8be60aa1bbab0fbb887ed2955a70f06c9522d1612158b1ad914ee3193eb619998ab4892189075c93b0ec8f03516c0eacc4e9604aea25b2a10eaf5cb6eaad5568618787d27c8355cf850586d9826e8bfd94dd1ef3b9c336591ed78d93228938e35f4e87b4a22d3a69f4cb65f5477ccaaeaaffefd13e32ee31790bfed876fc2e699a620489bbfdeb8649c16aad3bd61faf5694c59a58675d5453a3b8f69a8ae37561e2e62aa7fffb5e86c1f88757a90ec38712ce14ed894cee17a7dba720f0661455fb4fafd7edf1d45cd2675c010d2696cb42cc344e142e77b774e59c56aae50a500cf649a24b47d52f1f70f68f364a087810bb803b65c3fca525a3c9c8a5c05c4ce4cccfa8688bcb546b7877f4b774e134d333d95a96fdaae79479358db51614791588054a3f6815bdcea62ca32d8e99f5c823c2d9ce19ddc11d8c9e11d4611e022681fe327aa5d4820e54b8e0a0c7ef9342523e0105a8287abb95320749922aa5f38b36d65ac9e09743e6e02113493e86c9f0a836f3cfbc35841cef2ff3fae2840a5735a5223a04c7c622fcd5828481cd87ca0eb9e3705ff49b2731445542613af68e65621ee33de1edafcc0261bdc3efd695c26fbdb86bcf26c2bc16075a80e0d45afadad9d3abbc0208c8ddb3e7cc2aab41e4aa34c9ac124186a91c98e514322d575b98a58756215e2cb13dcf8d8e0add66f8cf463bf3641b1c0d2bcdc639cdd20b4049af1099c3e65c51aa6e12aaf2d2681e9e440d239f40957e469149890035b7dfc26de2d72e2ae7a2fae79396da189c89ff0f780a50b9b375e43f81f2b0578b81987e7af010592a3519a128c5b25a3bce984324c0acb2d697887097daafe317f9dfb44d5553a26a0967f5df0b910fff93302e83bcce48a79f131c8d220a19fef3d042ce3a3563217fea91087fba587d20fa64d25951d9ad55c6fa594d4629f814b8246373782cc8a0686216618294e7c0b8ce8fc99060e2b76ce3c0be081faea0b470f900908e34a347a7efc824d4137d2532145aaa5dced1dc5d49e8f21ac9f60c79919bf93a329fd335d631f6e842f71709f14db8d0f3b65e36c4434f999a542f707e45754be4fc5e42ac41dcce556e478c47b460a41c5bb331e2756cca45f4022110c3051d8bf90702ee9c8955661ea532e89ce31c6d27d9b7123881b3a6a904c032d4398c28031c5e5e371c889abf07802d47a2d19bb3baecaf39d7d29907f52e6a73a07c9fcf945f0fad2ea4deef62610a803a880eb4551afba236f431685a24edaac5bc8e269b7f698b216b084a2de3196a27cf76b363483e73c6ff19875916c0b110d1fe6d1ddb9d349831b69957ec8523a86cfdf5f9b95c312acdd3009baec91e17a7b60263ec394c295ef2f9010c06d551e350bb931574701c98d2e494f15024230b661d0e94adde9896e7d6e0ae71f1167ee4e898bf590583539af8d56f34db68a555cfb5ee77020d45e59a2a6ef0cbc481a18f4fa0acb3999c4e94a45c8e4ce218c5cef22f7d4a6aa8839ff660db7b97bb3e29e3f7a058764f3c36bf482b0214e3ae93eb0ae816db3dc517cb7e4dfea128ceff15cf89b691af52c489a19f9fd1ff4d538e99f3c14378045c9b69499e71828e924c11db7787db60543dbacca7d741676260c6dc75b28703a7e741a9c15137da4a508a38cc0bb51c0279f71dde32a34737a215b5c70b9c6be4438b2aa45b6eb2f4aba47d58daee4659cfdce1cc9130cad306de7ed4c3d22ca39d7462075180386ee3138edc4a9161dc5e57448fc362775f36e40964b52dd329d26a34490fdefb2d49fb75ed8c20420b131112f1de5290efcec55358316dac2450054f84dc14e24959d25632ec13fb6a0de8756a96058be40562dbc2c88f75d75c9fc55462548686d83e21526d1eb976ee5f31e9f01afe8566d733751444bea6355bb8e30a3c444b608edbfee3b1ad7ba0f77dc6b233aa24795d5bcc3c6f1b37ce340ab7939f120d7a23c875190abb11c443a7735f80c84a8dc70fadcb31fdfa8b83879059fbe0ddee049376f5126cd898a7407bcc14891ad1af94cf0a20d01d79d36bc93bde140e37fe53602c6a0b22ec7e4570eaf63fc7cc192222ab3c1a37e9d59504fcd1889f99bea00a5f105377b5dec98980dc0d1c1a4108abe473247c987afc9f6b435fd5ada48dadd9def1da422ae2111aef21875804e2d4d9ee33e4cbf41a4979b757deb80976f1459da71644b950c4ce5db8731e351932b349543e6b762d81cf10e3afd107344f72db19725341ab731e0d159ed19f6ec36aad6cc7519e21b5562f44a9310a40f892b7d6892d3eb8ebf0651599df7ebb8b33ab1e91437f5445813c69e811858c47425e3efde2f7a79025d22a729b3ef887233ac9b3720da112d2f4c5221e1bdaee727288701d12209ddb803f80e9e40994d18457fb0ebea46ff187bb6f669bb93fa6bacbdaefbe2ab29d4e91907d37e002c65027cd8cd94e7542ac87da2f3e0940698ad55d668a445db4cd95fa0cbfeda077655b5a5269c7f3989e8129087cb0f615d28e237c490c5fba8fc035a02f115d319f4f4926754cfd17df9565291eba8c679ed897b866cc58cfddc93e3d31f5626bfec7ee9df2c7ba61211dc34b8a5d4ab686315206c6f704b72b2bf4ba52ca825c067d7c476bf3cf7aab73f78f6889e16fe723c63972d7435e461ec52af227b23acedd265e0a000325cf5e48fff78d4397aefae87fe5b732d145e7329ff55f647e81d93a37b92b740865dd4756e6d1e379307fda69757a332f7881427ecc21f5699e57fc63488594c96d05f0d16c75517971a616f445c081ea3afa6939621e830c9990530c610a5787174b721c6f7836ee89d2ff661fca269e0beac7bd396d30a9acc3e88a708f4bf8d4c639e23f55f97de0365cf49b0c4acb3b259e95eedbd1418a4cc2fdf20978f60eaaf285a6d8d94d17d932b2c63a99f3dae1415d64bf5babd5496dd1b036c500f891a3bd6a63fe82eab42a4279f4c1e1287e6407a8c7912b702f691665eba8d9807b486062c68a9efa490b1n;
// basic shorthand
const d = (m - c) * ainv;

const lcg = (n: bigint): bigint => {
    return (n * a + c) % m;
}

// inverse operation
const unlcg = (n: bigint): bigint => {
    return (n * ainv + d) % m;
}

const populateCanvas = (n: bigint) => {
    const canvas = document.querySelector<HTMLCanvasElement>(`#n${n}`);
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            let bits = lcg(n);
            const data = ctx.createImageData(imageWidth, imageHeight);
            for (let y = 0; y < imageHeight; y++) {
                for (let x = 0; x < imageWidth; x++) {
                    const i = y * imageWidth + x;
                    const rgb = Number(BigInt.asUintN(24, bits));
                    bits >>= 24n;
                    data.data[i * 4] = rgb >> 16;
                    data.data[i * 4 + 1] = (rgb >> 8) & 0xff;
                    data.data[i * 4 + 2] = rgb & 0xff;
                    data.data[i * 4 + 3] = 0xff;
                }
            }
            ctx.putImageData(data, 0, 0);
        }
    }
}

const populatePage = (page: bigint) => {
    // something weird scope-related
    for (let i = 0n; i < bannersPerPage; i++) {
        populateCanvas(page * bannersPerPage + i);
    }
}

populatePage(0n);

// Debugging events
// document.addEventListener('scroll', event => {
//     console.log('scroll event', window.scrollY, document.body.clientHeight, event);
// })