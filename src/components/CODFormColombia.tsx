import { useState, useEffect, useRef, useCallback } from "react";
import selosConfianza from "@/assets/selos-confianza.jpg";
import { trackTikTokConversion, trackFacebookConversion, identifyTikTokUser, trackTikTokPurchase } from "@/hooks/useTrackingPixels";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Package, AlertTriangle, CheckCircle, Shield, Truck, Award, LockKeyhole } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import guaranteeBadge from "@/assets/guarantee-badge.png";

import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Departamentos de Colombia
const DEPARTAMENTOS = [
  "AMAZONAS", "ANTIOQUIA", "ARAUCA", "ARCHIPIELAGO DE SAN ANDRES",
  "ATLANTICO", "BOLIVAR", "BOYACA", "CALDAS", "CAQUETA", "CASANARE",
  "CAUCA", "CESAR", "CHOCO", "CORDOBA", "CUNDINAMARCA", "GUAINIA",
  "GUAVIARE", "HUILA", "LA GUAJIRA", "MAGDALENA", "META", "NARIÑO",
  "NORTE DE SANTANDER", "PUTUMAYO", "QUINDIO", "RISARALDA", "SANTANDER",
  "SUCRE", "TOLIMA", "VALLE DEL CAUCA", "VAUPES", "VICHADA"
];

const CIUDADES_POR_DEPARTAMENTO: Record<string, string[]> = {
  "AMAZONAS": ["LA CHORRERA", "LETICIA", "PUERTO NARIÑO"],
  "ANTIOQUIA": ["ABEJORRAL", "ABRIAQUI", "ALEJANDRIA", "ALTAMIRA", "ALTAVISTA", "ALTO POMPEYA", "AMAGA", "AMALFI", "ANDES", "ANGELOPOLIS", "ANGOSTURA", "ANORI", "ANZA", "APARTADO", "ARBOLETES", "ARGELIA (A)", "ARMENIA", "BARBOSA", "BELLO", "BELMIRA", "BETANIA", "BETULIA (ANT)", "BOLOMBOLO", "BRICEÑO", "BURITICA", "CACERES", "CAICEDO", "CALDAS", "CAMPAMENTO", "CAÑASGORDAS", "CARACOLI", "CARAMANTA", "CAREPA", "CAROLINA", "CASABE", "CASABE - YONDO", "CAUCASIA", "CHIGORODO", "CISNEROS", "CIUDAD BOLIVAR", "COCORNA", "CONCEPCION", "CONCORDIA", "COPACABANA", "CURRULAO", "DABEIBA", "DON MATIAS", "DORADAL", "EBEJICO", "EL BAGRE", "EL CARMEN DE VIBORAL", "EL DOCE", "EL JARDIN (TAMANA)", "EL SANTUARIO", "EL TOTUMO (NECOCLI)", "EL TRES (TURBO)", "EL VALLE", "ENTRERRIOS", "ENVIGADO", "FREDONIA", "FRONTINO", "GIRALDO", "GIRARDOTA", "GOMEZ PLATA", "GRANADA", "GUADALUPE", "GUARUMO", "GUARNE", "GUATAPE", "HELICONIA", "HISPANIA", "ITAGUI", "ITUANGO", "JARDIN", "JERICO", "LA CEJA", "LA CRUZADA (REMEDIOS)", "LA ESTRELLA", "LA PINTADA", "LA SIERRA", "LA TABLACITA", "LA TABLAZA", "LA UNION", "LIBORINA", "LLANOS DE CUIVA", "MACEO", "MARINILLA", "MEDELLIN", "MONTEBELLO", "MURINDO", "MUTATA", "NARIÑO", "NECHI", "NECOCLI", "NUEVA COLONIA", "OLAYA", "PALERMO", "PALMITAS", "PEÑOL", "PEQUE", "PUEBLORRICO", "PUERTO BERRIO", "PUERTO CLAVER", "PUERTO NARE", "PUERTO PERALES NUEVO", "PUERTO TRIUNFO", "PUERTO VALDIVIA", "REMEDIOS", "RETIRO", "RIONEGRO (ANT)", "SABANALARGA", "SABANETA", "SALGAR", "SAN ANDRES DE CUERQUIA", "SAN ANTONIO DE PEREIRA", "SAN ANTONIO DE PRADO", "SAN CARLOS", "SAN CRISTOBAL", "SAN FRANCISCO", "SAN JERONIMO", "SAN JOSE DE LA MONTAÑA", "SAN JOSE DEL NUS (SAN JOSE DE NUESTRA SEÑORA)", "SAN JUAN DE URABA", "SAN LUIS", "SAN PEDRO DE LOS MILAGROS", "SAN PEDRO DE URABA", "SAN RAFAEL", "SAN ROQUE", "SAN VICENTE", "SANTA BARBARA", "SANTA ELENA", "SANTA ROSA DE OSOS", "SANTAFE DE ANTIOQUIA", "SANTIAGO", "SANTO DOMINGO", "SEGOVIA", "SONSON", "SOPETRAN", "TAMESIS", "TARAZA", "TARSO", "TITIRIBI", "TOLEDO", "TURBO", "URAMITA", "URRAO", "VALDIVIA", "VALPARAISO", "VEGACHI", "VENECIA", "VERSALLES", "VIGIA DEL FUERTE", "YALI", "YARUMAL", "YOLOMBO", "ZARAGOZA"],
  "ARAUCA": ["ARAUCA", "ARAUQUITA", "CRAVO NORTE", "FORTUL", "LA ESMERALDA", "PANAMA", "PUERTO JORDAN", "PUERTO RONDON", "SARAVENA", "TAME"],
  "ARCHIPIELAGO DE SAN ANDRES": ["PROVIDENCIA - ISLA SANTA CATALINA", "SAN ANDRES"],
  "ATLANTICO": ["AGUADA DE PABLO", "ARROYO DE PIEDRA", "BARANOA", "BARRANQUILLA", "CAMPECHE", "CAMPO DE LA CRUZ", "CANDELARIA", "CARACOLI", "CASCAJAL", "GALAPA", "JUAN DE ACOSTA", "JUAN MINA", "LA PEÑA", "LURUACO", "MALAMBO", "MANATI", "MOLINERO", "PALMAR DE VARELA", "PIOJO", "PLAYA MENDOZA", "POLONUEVO", "PONEDERA", "PUERTO COLOMBIA", "PUERTO GIRALDO", "REPELON", "SABANAGRANDE", "SABANALARGA", "SALGAR", "SANTA CRUZ", "SANTA LUCIA", "SANTA VERONICA", "SANTO TOMAS", "SOLEDAD", "SUAN", "TUBARA", "USIACURI"],
  "BOLIVAR": ["ACHI", "ALTOS DEL ROSARIO", "ARENAL", "ARJONA B", "ARROYOHONDO", "BARRANCO DE LOBA", "BARU", "BAYUNCA", "BUENA SENA", "CALAMAR", "CANTAGALLO", "CARTAGENA", "CASCAJAL", "CICUCO", "CLEMENCIA B", "CORDOBA", "CRUZ DEL VIZO", "EL CARMEN DE BOLIVAR", "EL GUAMO (B)", "EL PEÑON (BOL)", "GAMBOTE", "HATILLO DE LOBA", "JUAN ARIAS", "LA RINCONADA", "LOMA DE ARENA", "MAGANGUE", "MAHATES", "MALAGANA", "MANZANILLO DEL MAR", "MARGARITA", "MARIA LA BAJA B", "MOMPOS", "MONTECRISTO BOLIVAR", "MORALES (B)", "NOROSI", "PAPAYAL", "PASACABALLOS", "PINILLOS", "PONTEZUELA", "PUERTO RICO", "PUNTA CANOA", "PUNTA DE CARTAGENA", "REGIDOR", "RIO VIEJO", "SAN BASILIO DE PALENQUE", "SAN CAYETANO", "SAN CRISTOBAL", "SAN ESTANISLAO", "SAN FERNANDO (B)", "SAN JACINTO", "SAN JACINTO DEL CAUCA", "SAN JUAN NEPOMUCENO", "SAN MARTIN", "SAN MARTIN DE LOBA", "SAN PABLO", "SAN PABLO (MARIA LA BAJA)", "SANTA ANA (B)", "SANTA CATALINA", "SANTA ROSA DE LIMA", "SANTA ROSA DEL SUR", "SIMITI", "SINCERIN", "SOPLAVIENTO B", "TALAIGUA NUEVO", "TIERRA BAJA", "TIQUISIO NUEVO", "TURBACO B", "TURBANA", "VILLANUEVA", "YATI", "ZAMBRANO"],
  "BOYACA": ["ALMEIDA", "AQUITANIA", "ARCABUCO", "BELEN", "BELENCITO", "BERBEO", "BETEITIVA", "BOAVITA", "BOSIGAS", "BOYACA", "BRICEÑO (B)", "BUENAVISTA", "BUSBANZA", "CALDAS", "CAMPOHERMOSO", "CERINZA", "CHINAVITA", "CHIQUINQUIRA", "CHIQUIZA", "CHISCAS", "CHITA", "CHITARAQUE", "CHIVATA", "CHIVOR", "CIENEGA", "CIUDADELA INDUSTRIAL", "COMBITA", "COPER", "CORRALES", "COVARACHIA", "CUBARA", "CUCAITA", "CUITIVA", "DUITAMA", "EL COCUY", "EL ESPINO", "FIRAVITOBA", "FLORESTA", "GACHANTIVA", "GAMEZA", "GARAGOA", "GUACAMAYAS", "GUATEQUE", "GUAYATA", "GUICAN", "IZA", "JENESANO", "JERICO", "KILOMETRO 11", "KILOMETRO 25", "LA CAPILLA", "LA UVITA", "LA VICTORIA (B)", "LABRANZAGRANDE", "MACANAL", "MARIPI", "MIRAFLORES", "MONGUA", "MONGUI", "MONIQUIRA", "MOTAVITA", "MUZO", "NARIÑO", "NOBSA", "NUEVO COLON", "OICATA", "OTANCHE", "PACHAVITA", "PAEZ", "PAIPA", "PAJARITO", "PALAGUA SEGUNDO SECTOR", "PANQUEBA", "PAUNA", "PAYA", "PAZ DE RIO", "PESCA", "PISBA", "PUERTO BOYACA", "PUENTE BOYACA", "PUNTA LARGA", "QUIPAMA", "RAMIRIQUI", "RANCHOGRANDE", "RAQUIRA", "RONDON", "SABOYA", "SACHICA", "SAMACA", "SAN EDUARDO", "SAN JOSE DE PARE", "SAN LUIS DE GACENO", "SAN MATEO", "SAN MIGUEL DE SEMA", "SAN PABLO DE BORBUR", "SANTA BARBARA", "SANTA MARIA", "SANTA ROSA DE VITERBO", "SANTA SOFIA", "SANTA TERESA", "SANTANA", "SATIVANORTE", "SATIVASUR", "SIACHOQUE", "SOATA", "SOCHA", "SOCOTA", "SOGAMOSO", "SOMONDOCO", "SORA", "SORACA", "SOTAQUIRA", "SUSACON", "SUTAMARCHAN", "SUTATENZA", "TASCO", "TENZA", "TIBANA", "TIBASOSA", "TIERRA NEGRA", "TINJACA", "TIPACOQUE", "TOCA", "TOGUI", "TOPAGA", "TOTA", "TRINIDAD", "TUNJA", "TUNUNGUA", "TURMEQUE", "TUTA", "TUTAZA", "UMBITA", "VENTAQUEMADA", "VILLA DE LEYVA", "VIRACACHA", "ZETAQUIRA", "COSCUEZ"],
  "CALDAS": ["AGUADAS", "ALTO CORINTO", "ALTO TABLAZO", "ANSERMA", "ARANZAZU", "ARAUCA", "ARMA", "BAJO CORINTO", "BAJO TABLAZO", "BELALCAZAR (CL)", "BOLIVIA", "BONAFONT", "CHINCHINA", "EL ARENILLO", "FILADELFIA", "FLORENCIA", "GUARINOCITO", "KILOMETRO 41 - COLOMBIA", "LA CABAÑA", "LA CUCHILLA DEL SALADO", "LA DORADA", "LA LINDA", "LA MERCED", "LOS PLANES", "MANIZALES", "MANZANARES", "MARMATO", "MARQUETALIA", "MARULANDA", "NEIRA", "NORCASIA", "PACORA", "PALESTINA", "PENSILVANIA", "RIOSUCIO", "RISARALDA", "SALAMINA", "SAMANA", "SAMARIA", "SAN DANIEL", "SAN FELIX", "SAN JOSE (C)", "SUPIA", "VICTORIA", "VILLAMARIA", "VITERBO"],
  "CAQUETA": ["ALBANIA", "BELEN DE LOS ANDAQUIES", "CAMPO HERMOSO", "CARTAGENA DEL CHAIRA", "CURILLO", "EL DONCELLO", "EL PAUJIL", "FLORENCIA", "LA MONTAÑITA", "LA UNION PENEYA", "MILAN", "MORELIA", "PUERTO RICO", "SAN ANTONIO DE GETUCHA", "SAN JOSE DEL FRAGUA", "SAN VICENTE DEL CAGUAN", "SOLANO", "SOLITA", "VALPARAISO (CAQ)"],
  "CASANARE": ["AGUAZUL", "CHAMEZA", "EL MORRO", "HATO COROZAL", "LA CHAPARRERA", "LA SALINA", "LA YOPALOSA", "MANI", "MONTERREY", "NUNCHIA", "OROCUE", "PASO CUSIANA", "PAZ DE ARIPORO", "PORE", "PUENTE", "RECETOR", "SABANALARGA", "SACAMA", "SAN LUIS DE PALENQUE", "TACARIMENA", "TAMARA", "TAURAMENA", "TRINIDAD", "VILLANUEVA (C)", "YOPAL"],
  "CAUCA": ["ALMAGUER", "ARGELIA (C)", "BALBOA (C)", "BELALCAZAR (CA)", "BOLIVAR (C)", "BUENOS AIRES", "CAJIBIO", "CALDONO", "CALIBIO", "CALOTO", "COCONUCO", "CORINTO", "EL BORDO", "EL ESTRECHO (C)", "EL PLATEADO", "EL TAMBO (CA)", "FLORENCIA", "GUACHENE", "GUAPI", "INZA", "JAMBALO", "LA SIERRA", "LA VEGA", "MERCADERES", "MICAY", "MIRANDA", "MONDOMO", "MORALES (C)", "ORTIGAL", "PADILLA", "PAEZ", "PAISPAMBA", "PATIA (C)", "PESCADOR", "PIAMONTE", "PIENDAMO", "POPAYAN", "PUERTO TEJADA", "PURACE", "ROSAS", "SAN SEBASTIAN", "SANTA ROSA", "SANTANDER DE QUILICHAO", "SANTIAGO", "SIBERIA", "SILVIA", "SOTARA", "SUAREZ", "SUCRE", "TIMBA", "TIMBIO", "TIMBIQUI", "TORIBIO", "TOTORO", "TUNIA", "VILLA RICA"],
  "CESAR": ["AGUAS BLANCAS", "AGUACHICA", "AGUSTIN CODAZZI", "ARJONA", "ASTREA", "BECERRIL", "BOSCONIA", "CARACOLI", "CARACOLICITO", "CASACARA (AGUSTIN CODAZZI)", "CHIMICHAGUA", "CHIRIGUANA", "CODAZZI", "CURUMANI", "EL COPEY", "EL JUNCAL", "EL PASO", "GAMARRA", "GONZALEZ", "LA GLORIA", "LA JAGUA DE IBIRICO", "LA LOMA", "LA MATA", "LA PAZ", "LA SIERRA", "LAS VEGAS", "MANAURE (C)", "MANDINGUILLA", "MARIANGOLA", "MINA DRUMOND PRIBBENOW", "PAILITAS", "PELAYA", "PUEBLO BELLO", "RINCON HONDO", "RIO DE ORO", "SAN ALBERTO", "SAN DIEGO", "SAN MARTIN (C)", "SAN ROQUE", "TAMALAMEQUE", "VALLEDUPAR"],
  "CHOCO": ["ACANDI", "ALTO BAUDO", "BAGADO", "BAHIA SOLANO MUTIS", "BAJO BAUDO", "BELEN DE BAJIRA", "BOJAYA", "CARMEN DEL DARIEN", "CERTEGUI", "CONDOTO", "EL CANTON DE SAN PABLO", "EL CARMEN DE ATRATO", "ISTMINA", "JURADÓ", "LLORÓ", "MEDIO ATRATO", "MEDIO BAUDÓ", "MEDIO SAN JUAN", "NOVITA", "NUQUÍ", "PIZARRO", "QUIBDO", "RIOSUCIO", "RÍO IRO", "RIO QUITO", "SAN JOSE DEL PALMAR", "SIPÍ", "TADO", "TUTUNENDO", "UNGUIA", "UNION PANAMERICANA", "YUTO"],
  "CORDOBA": ["AYAPEL", "BUENAVISTA (COR)", "CANALETE", "CARRILLO", "CERETE", "CERROMATOSO", "CHIMA (C)", "CHINU", "CIENAGA DE ORO", "CORDOBA", "COTORRA", "EL PORVENIR (C)", "EL VIAJANO", "LA APARTADA Y LA FRONTERA", "LA YE", "LORICA", "LOS CORDOBAS", "LOS GARZONES", "MATEO GOMEZ", "MOMIL", "MONTELIBANO", "MONTERIA", "MOÑITOS", "PLANETA RICA", "PUEBLO NUEVO", "PUERTO ESCONDIDO", "PUERTO LIBERTADOR", "PURISIMA", "RABOLARGO", "RETIRO DE LOS INDIOS", "SAHAGUN", "SAN ANDRES DE PALOMO", "SAN ANDRES DE SOTAVENTO", "SAN ANTERO", "SAN BERNARDO DEL VIENTO", "SAN CARLOS", "SAN CARLOS CORDOBA", "SAN JOSE DE URE", "SAN PELAYO", "TIERRALTA", "TUCHIN", "VALENCIA"],
  "CUNDINAMARCA": ["ABASTICOS", "AGUA DE DIOS", "ALBAN", "ANAPOIMA", "ANOLAIMA", "APULO", "ARBELAEZ", "BAGAZAL", "BELTRAN", "BITUIMA", "BOGOTA", "BOJACA", "BRICEÑO", "CABRERA", "CABULLARITO", "CACHIPAY", "CAJICA", "CAMBAO", "CAPELLANIA", "CAPARRAPI", "CAQUEZA", "CARMEN DE CARUPA", "CHAGUANI", "CHIA", "CHINAUTA", "CHIPAQUE", "CHOACHI", "CHOCONTA", "COGUA", "COTA", "CUCUNUBA", "EL COLEGIO (MESITAS)", "EL PEÑON", "EL PIÑAL", "EL ROSAL", "EL TRIUNFO", "FACATATIVA", "FOMEQUE", "FOSCA", "FUNZA", "FUQUENE", "FUSAGASUGA", "GACHALA", "GACHANCIPA", "GACHETA", "GAMA", "GIRARDOT", "GRANADA", "GUACHETA", "GUADUERO", "GUADUAS", "GUASCA", "GUATAQUI", "GUATAVITA", "GUAYABAL DE SIQUIMA", "GUAYABETAL", "GUTIERREZ", "JERUSALEN", "JUNIN", "LA CALERA", "LA FLORIDA", "LA GRAN VÃA", "LA MESA", "LA PALMA", "LA PEÑA", "LA VEGA", "LA VICTORIA", "LAGUNA AZUL", "LENGUAZAQUE", "LIMONCITOS", "MACHETA", "MADRID", "MANTA", "MAYA", "MEDINA", "MOSQUERA", "NARIÑO", "NAZARETH", "NEMOCON", "NILO", "NIMAIMA", "NOCAIMA", "PACHO", "PAIME", "PANDI", "PARATEBUENO", "PARCELAS", "PASCA", "PUENTE DE PIEDRA", "PUENTE PIEDRA (LA PUNTA)", "PUENTE QUETAME", "PUERTO BOGOTA", "PUERTO SALGAR", "PULI", "QUEBRADANEGRA", "QUETAME", "QUIPILE", "RICAURTE", "SAN ANTONIO DE ANAPOIMA", "SAN ANTONIO DEL TEQUENDAMA", "SAN BERNARDO", "SAN CAYETANO", "SAN FRANCISCO", "SAN JOAQUIN (C)", "SAN JUAN DE RIO SECO", "SANTANDERCITO", "SASAIMA", "SESQUILE", "SIBATE", "SILVANIA", "SIMIJACA", "SOACHA", "SOPO", "SUBACHOQUE", "SUBIA", "SUESCA", "SUPATA", "SUSA", "SUTATAUSA", "TABIO", "TAUSA", "TENA", "TENJO", "TIBACUY", "TIBIRITA", "TIBITO", "TOBIA", "TOCAIMA", "TOCANCIPA", "TOPAIPI", "UBALA", "UBAQUE", "UBATE", "UNE", "UTICA", "VENECIA (C)", "VERGARA", "VIANI", "VILLAGOMEZ", "VILLAPINZON", "VILLETA", "VIOTA", "YACOPI", "ZIPACON", "ZIPAQUIRA", "SUEVA"],
  "GUAINIA": ["BARRANCO MINAS", "INIRIDA"],
  "GUAVIARE": ["CALAMAR", "EL RETORNO", "LA LIBERTAD", "MIRAFLORES", "SAN JOSE DEL GUAVIARE"],
  "HUILA": ["ACEVEDO", "AGRADO", "AIPE", "ALGECIRAS", "ALTAMIRA", "AVISPERO", "BARAYA", "BELEN (H)", "BRUSELAS", "CAGUAN", "CAMPOALEGRE", "COLOMBIA", "ELIAS", "EL JUNCAL", "EL JUNCAL (PALERMO)", "FORTALECILLAS", "GARZON", "GIGANTE", "GUADALUPE", "GUACACAYO", "GUAYABAL (HUL)", "HOBO", "IQUIRA", "LA ARGENTINA", "LA PLATA", "NATAGA", "NEIVA", "OPORAPA", "PACARNI", "PAICOL", "PALERMO", "PALESTINA", "PITAL", "PITALITO", "RIVERA", "SALADOBLANCO", "SAN AGUSTIN", "SAN FRANCISCO", "SAN JOSE DE ISNOS", "SANTA MARIA", "SUAZA", "TARQUI", "TELLO", "TERUEL", "TESALIA", "TIMANA", "ULLOA", "VILLAVIEJA", "YAGUARA", "ZULUAGA"],
  "LA GUAJIRA": ["ALBANIA", "BARRANCAS", "BUENAVISTA", "CAMPANA NUEVO", "CUESTECITAS", "DIBULLA", "DISTRACCION", "EL MOLINO", "FONSECA", "HATONUEVO", "LA JAGUA DEL PILAR", "LA MINA", "LA PAZ", "MAICAO", "MANAURE", "MINGUEO", "PALOMINO", "PAPAYAL", "PARAGUACHON", "RIO ANCHO", "RIOHACHA", "SAN JUAN DEL CESAR", "URIBIA", "URUMITA", "VILLANUEVA"],
  "MAGDALENA": ["ALGARROBO", "ARACATACA", "ARIGUANI", "BURITACA", "CARRETO", "CERRO SAN ANTONIO", "CHIVOLO", "CIENAGA", "CONCORDIA", "EL BANCO", "EL DIFICIL", "EL PALMAR (EL CHUZO)", "EL PIÑON", "EL RETEN", "FUNDACION", "GAIRA", "GUACAMAYAL", "GUACHACA", "GUAMAL (MAG)", "LA GRAN VIA", "LOS ANDES", "MEDIALUNA", "MINCA", "NUEVA GRANADA (M)", "ORIHUECA", "PALERMO", "PEDRAZA", "PIJIÑO", "PIVIJAY", "PLATO", "PRADO - SEVILLA", "PUEBLO NUEVO", "PUEBLITO DE LOS BARRIOS", "PUEBLOVIEJO", "REMOLINO", "RIO FRIO", "SABANAS", "SABANAS DE SAN ANGEL", "SALAMINA", "SAN ANGEL", "SAN SEBASTIAN DE BUENAVISTA", "SAN ZENON", "SANTA ANA (M)", "SANTA BARBARA DE PINTO", "SANTA MARTA", "SANTA ROSALIA", "SEVILLA", "SITIO NUEVO", "SITIONUEVO", "TAGANGA", "TENERIFE", "TUCURINCA", "ZAPAYAN", "ZONA BANANERA"],
  "META": ["ACACIAS", "AGUAS CLARAS", "ALTO POMPEYA", "APIAY", "BARRANCA DE UPIA", "CABUYARO", "CASTILLA LA NUEVA", "CHICHIMENE", "CONCEPCION", "CUBARRAL", "CUMARAL", "EL CALVARIO", "EL CASTILLO", "EL DORADO", "EL TORO", "FUENTE DE ORO", "GRANADA (M)", "GUAMAL", "JARDIN DE LAS PENAS", "LA JULIA", "LA MACARENA", "LA PALMERA", "LEJANIAS", "MAPIRIPAN", "MEDELLIN DEL ARIARI", "MESETAS", "PACHAQUIARO", "PIÑALITO", "POMPEYA", "PUEBLO NUEVO (PTO GAITAN)", "PUERTO CONCORDIA", "PUERTO GAITAN", "PUERTO LLERAS", "PUERTO LOPEZ", "PUERTO RICO", "PUNTA BRAVA (GRANADA)", "RESTREPO", "RUBIALES", "SAN CARLOS DE GUAROA", "SAN JUAN DE ARAMA", "SAN JUAN DEL LOSADA", "SAN JUANITO", "SAN LORENZO", "SAN MARTIN", "URIBE", "VANGUARDIA", "VILLAVICENCIO", "VISTAHERMOSA"],
  "NARIÑO": ["ALBAN", "ALDANA", "ANCUYA", "BARBACOAS", "BELEN", "BERRUECOS", "BOCAS DE SATINGA", "BOMBONA", "BUESACO", "CARLOSAMA", "CATAMBUCO", "CEBADAL", "CHACHAGUI", "COLON", "CONSACA", "CONTADERO", "CORDOBA N", "CRISTOBAL COLON", "CUASPUD NUCLEO", "CUBIJAN BAJO", "CUMBAL", "CUMBITARA", "EL CHARCO", "EL EJIDO", "EL EMPATE", "EL ENCANO", "EL PEDREGAL ( IMUES)", "EL PEÑOL", "EL REMOLINO", "EL ROSARIO", "EL TABLON", "EL TAMBO (NA)", "ESPRIELLA", "FRANCISCO PIZARRO", "FUNES", "GENOVA (N)", "GUACHAVES", "GUACHUCAL", "GUAITARILLA", "GUAITARILLA (COLON)", "GUALMATAN", "GUALMATÁN", "GUAYACANAL", "ILES", "IMUES", "IPIALES", "ISCUANDE", "LA CRUZ", "LA FLORIDA (N)", "LA LAGUNA", "LA LLANADA", "LA TOLA", "LA UNION", "LAS CRUCES", "LAS LAJAS", "LEIVA", "LINARES", "LLORENTE", "MAGUI", "MALLAMA", "MOSQUERA", "NARIÑO", "OLAYA HERRERA", "OSPINA", "PASTO", "PIEDRANCHA", "PILCUAN LA RECTA", "PILCUAN VIEJO (2)", "PINZON", "POLICARPA", "POTOSI", "PROVIDENCIA", "PUERRES", "PUPIALES", "RICAURTE (N)", "ROBERTO PAYAN", "ROSA FLORIDA", "SAMANIEGO", "SAN BERNARDO", "SAN JOSE DE ALBAN", "SAN JUAN", "SAN JUAN DE ANGANOY", "SAN LORENZO", "SAN PABLO", "SAN PEDRO DE CARTAGO", "SANDONA", "SANTA BARBARA", "SANTA CRUZ", "SAPUYES", "SOTOMAYOR", "TAJUMBINA", "TAMINANGO", "TANGUA", "TASNAQUE", "TUMACO", "TUQUERRES", "VILLAMORENO", "YACUANQUER", "EL TABLÓN DE GOMEZ", "GUAYACANA"],
  "NORTE DE SANTANDER": ["ABREGO", "AGUA CLARA", "AGUA LINDA", "AGUAS CLARAS", "ARBOLEDAS", "ASTILLEROS", "BOCHALEMA", "BUCARASICA", "CACOTA", "CACHIRA", "CAMPO DOS", "CHINACOTA", "CHITAGA", "CONVENCION", "CORNEJO", "CUCUTA", "CUCUTILLA", "DURANIA", "EL CARMEN", "EL DIAMANTE", "EL NUEVO DIAMANTE", "EL TARRA", "EL ZULIA", "GRAMALOTE", "HACARI", "HERRAN", "LA ALEJANDRA", "LA DONJUANA", "LA ESPERANZA", "LA FLORESTA", "LA GABARRA", "LA GARITA", "LA JARRA", "LA LAGUNA", "LA LLANA", "LA NUEVA DONJUANA", "LA PLAYA", "LA VEGA", "LA YE - SAN MIGUEL", "LABATECA", "LLANO GRANDE", "LOS PATIOS", "LOS VADOS", "LOURDES", "MUTISCUA", "OCAÑA", "ORIPAYA", "PAMPLONA", "PAMPLONITA", "PATILLALES", "PETROLEA", "PUERTO SANTANDER", "RAGONVALIA", "RECTA LOS ALAMOS", "SALAZAR", "SAN BERNARDO DE BATA", "SAN CALIXTO", "SAN CAYETANO", "SAN FAUSTINO", "SANTIAGO", "SARDINATA", "SILOS", "TEORAMA", "TIBU", "TOLEDO", "URIMACO", "VILLA CARO", "VILLA DEL ROSARIO"],
  "PUTUMAYO": ["COLON", "EL PEPINO", "EL TIGRE", "LA DORADA (P)", "LA HORMIGA", "LEGUIZAMO", "MOCOA", "ORITO", "PUERTO ASIS", "PUERTO CAICEDO", "PUERTO GUZMAN", "PUERTO LIMON", "SAN FRANCISCO", "SAN MIGUEL", "SANTANA", "SANTIAGO", "SIBUNDOY", "VILLAGARZON", "VILLARRICA"],
  "QUINDIO": ["ARMENIA (Q)", "BARCELONA", "BARRAGAN", "BUENAVISTA", "CALARCA", "CIRCASIA", "CORDOBA", "EL CAIMO", "FILANDIA", "GENOVA (Q)", "LA TEBAIDA", "MONTENEGRO", "PIJAO", "PUEBLO TAPADO", "QUIMBAYA", "SALENTO"],
  "RISARALDA": ["APIA", "ARABIA", "BALBOA", "BELEN DE UMBRIA", "CAIMALITO", "DOSQUEBRADAS", "GUATICA", "IRRA", "LA CELIA", "LA VIRGINIA", "MARSELLA", "MISTRATO", "PEREIRA", "PUEBLO RICO", "QUINCHIA", "SAN CLEMENTE", "SAN JOSE", "SANTA ANA", "SANTA CECILIA", "SANTA ROSA DE CABAL", "SANTUARIO"],
  "SANTANDER": ["ACAPULCO", "AGUADA", "ALBANIA (S)", "ALTO JORDAN", "ARATOCA", "BAJO JORDAN", "BARBOSA", "BARICHARA", "BARRANCABERMEJA", "BARRIO NUEVO", "BERLIN", "BETULIA", "BOLIVAR", "BUCARAMANGA", "CABRERA", "CALIFORNIA (S)", "CAMPO 23", "CAPITANEJO", "CARCASI", "CEPITA", "CERRITO", "CHARALA", "CHARTA", "CHIMA (S)", "CHIMERA", "CIMITARRA", "CINCELADA", "CITE", "CONCEPCION", "CONFINES", "CONTRATACION", "COROMORO", "CRUCE PUERTO PARRA", "CURITI", "CHIPATA", "EL CARMEN DE CHUCURI", "EL CENTRO", "EL GUACAMAYO", "EL LLANITO", "EL PEÑON", "EL PLAYON", "EL POBLADO", "ENCINO", "ENCISO", "FLORIAN", "FLORIDABLANCA", "GALAN (S)", "GAMBITA", "GIRON", "GUACA", "GUADALUPE", "GUANE", "GUAPOTA", "GUAVATA", "GUEPSA", "HATO (S)", "JESUS MARIA", "JORDAN SUBE", "LA BELLEZA", "LA CORCOVA", "LA FORTUNA", "LA PALMA", "LA PAZ", "LA VEGA", "LANDAZURI", "LEBRIJA", "LOS LAURELES", "LOS SANTOS", "MACARAVITA", "MALAGA", "MATANZA", "MOGOTES", "MOLAGAVITA", "OCAMONTE", "OIBA", "OLIVAL", "ONZAGA", "PALMAR (S)", "PALMAS DEL SOCORRO", "PALO GORDO", "PARAMO", "PIEDECUESTA", "PINCHOTE", "PUENTE NACIONAL", "PUENTE SOGAMOSO", "PUERTO ARAUJO", "PUERTO NUEVO(SIMACOTA)", "PUERTO PARRA", "PUERTO WILCHES", "RIONEGRO", "SABANA DE TORRES", "SAN ANDRES", "SAN BENITO", "SAN BENITO NUEVO", "SAN GIL", "SAN JOAQUIN", "SAN JOSE DE MIRANDA", "SAN MIGUEL", "SAN RAFAEL", "SAN VICENTE DE CHUCURI", "SANTA BARBARA", "SANTA HELENA DEL OPON", "SIMACOTA", "SOCORRO", "SOGAMOSO", "SUAITA", "SUCRE", "SURATA", "TIENDA NUEVA", "TONA", "VADO REAL", "VALLE DE SAN JOSE", "VELEZ", "VETAS", "VILLANUEVA", "YARIMA", "ZAPATOCA"],
  "SUCRE": ["BUENAVISTA", "CAIMITO", "CHALAN", "CHOCHO", "COLOSO", "COROZAL", "COVEÑAS", "EL PIÑAL", "EL ROBLE", "GALERAS", "GUARANDA", "GUAYABAL", "LA GALLERA", "LA SIERPE", "LA UNION (S)", "LOS PALMITOS", "MAJAGUAL", "MORROA", "OVEJAS", "PALMITO", "PUNTA SECA", "SAMPUES", "SAN ANTONIO DE PALMITOS", "SAN BENITO ABAD", "SAN JUAN DE BETULIA", "SAN MARCOS", "SAN ONOFRE", "SAN PEDRO", "SAN ROQUE (MAJAGUAL)", "SIETE PALMAS", "SINCE", "SINCELEJO", "SUCRE (S)", "TOLU", "TOLU VIEJO"],
  "TOLIMA": ["ALPUJARRA", "ALVARADO", "AMBALEMA", "ANZOATEGUI", "ARMERO", "ATACO", "BUENOS AIRES", "CAJAMARCA", "CARMEN DE APICALA", "CASABIANCA", "CASTILLA", "CHAPARRAL", "CHICORAL", "COELLO", "CONVENIO (LIBANO)", "COYAIMA", "CUNDAY", "DOIMA", "DOLORES", "EL LIMON", "ESPINAL", "FALAN", "FLANDES", "FRESNO", "GAITANIA", "GUALANDAY", "GUAMO", "HERRERA", "HERVEO", "HONDA", "IBAGUE", "ICONONZO", "JUNIN", "LA ARADA", "LERIDA", "LIBANO", "MARIQUITA", "MELGAR", "MURILLO", "NATAGAIMA", "OLAYA HERRERA", "ORTEGA", "PADILLA", "PADUA", "PAJONALES", "PALOCABILDO", "PAYANDE", "PIEDRAS", "PLANADAS", "PLAYARRICA", "PRADO", "PURIFICACION", "RIOBLANCO", "RONCESVALLES", "ROVIRA", "SALDAÑA", "SAN ANTONIO", "SAN FRANCISCO DE LA SIERRA", "SAN LUIS", "SANTA ISABEL", "SANTIAGO PEREZ", "SUAREZ", "TOLEMAIDA", "VALLE DE SAN JUAN", "VENADILLO", "VILLAHERMOSA", "VILLARRICA (T)"],
  "VALLE DEL CAUCA": ["AGUACLARA", "ALCALA", "AMAIME", "ANDALUCIA", "ANSERMA NUEVO", "ARGELIA (V)", "BAHÍA MÁLAGA", "BAJO CALIMA", "BOLIVAR (V)", "BORRERO AYERBE", "BUENAVENTURA", "BUGA", "BUGALAGRANDE", "CAICEDONIA", "CALI", "CANDELARIA", "CAÑAVERAL VILLANUEVA", "CARTAGO", "CASCAJAL I", "CAUCASECO", "CIUDAD DEL CAMPO PALMIRA-VALLE", "DAGUA", "DARIEN (CALIMA)", "EL AGUILA", "EL CABUYAL (V)", "EL CAIRO", "EL CARMELO", "EL CERRITO", "EL DOVIO", "EL PLACER(EL CERRITO VALLE)", "EL QUEREMAL", "EL SALADITO", "FLORIDA", "GINEBRA", "GUABITAS", "GUACARI", "JAMUNDI", "JUANCHITO", "LA CUMBRE", "LA PAILA", "LA UNION (V)", "LA VICTORIA (V)", "LOBO GUERRERO", "MOCTEZUMA", "OBANDO", "PALMIRA", "PRADERA", "RESTREPO", "RIOFRIO", "ROLDANILLO", "ROZO", "SAN ANTONIO DE LOS CABALLEROS", "SAN PEDRO(V)", "SANTA ELENA", "SEVILLA", "SONSO", "TERRANOVA", "TORO", "TRUJILLO", "TULUA", "ULLOA", "URIBE URIBE", "VERSALLES", "VIJES", "VILLA GORGONA", "YOTOCO", "YUMBO", "ZARAGOZA (V)", "ZARZAL"],
  "VAUPES": ["CARURU", "MITU", "PACOA", "TARAIRA", "YAVARATÉ"],
  "VICHADA": ["CUMARIBO", "LA PRIMAVERA", "PUERTO CARREÑO", "SANTA ROSALIA"],
};

const formSchema = z.object({
  nombres: z.string().min(2, "Nombre debe tener al menos 2 caracteres").max(50),
  apellidos: z.string().min(2, "Apellido debe tener al menos 2 caracteres").max(50),
  direccion: z.string().min(10, "Dirección debe ser más detallada").max(200),
  complemento: z.string().max(100).optional().or(z.literal("")),
  departamento: z.string().min(1, "Seleccione un departamento"),
  ciudad: z.string().min(1, "Seleccione una ciudad"),
  telefono: z.string().regex(/^[0-9]{4,15}$/, "Ingrese un número de teléfono válido"),
  email: z.string().email("Por favor, ingrese un correo electrónico válido").optional().or(z.literal("")),
  nota: z.string().max(500).optional(),
});

const normalizePhone = (value: string) => value.replace(/\D/g, "").slice(0, 15);

type FormValues = z.infer<typeof formSchema>;

export interface IncludedItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface SizeDetail {
  name: string;
  image: string;
  topSize: string;
  bottomSize: string;
  topLabel?: string;
  bottomLabel?: string;
}

interface CODFormColombiaProps {
  productId: string;
  productPrice: number;
  productName?: string;
  productImage?: string;
  onOrderComplete?: () => void;
  includedItems?: IncludedItem[];
  sizeDetails?: SizeDetail[];
  productDisplayName?: string;
  tiktokPixelId?: string;
  facebookPixelId?: string;
  idVariable?: string;
  defaultNota?: string;
}

const DEFAULT_INCLUDED_ITEMS: IncludedItem[] = [
  { id: 'warranty', icon: '🛡️', title: 'Garantía Extendida 2 Años', description: 'Protección Extra para tu inversión' },
];

export function CODFormColombia({ productId, productPrice, productName = "Producto", productImage, onOrderComplete, includedItems = DEFAULT_INCLUDED_ITEMS, sizeDetails, productDisplayName, tiktokPixelId, facebookPixelId, idVariable, defaultNota }: CODFormColombiaProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientIp, setClientIp] = useState<string | null>(null);
  const [phoneBlocked, setPhoneBlocked] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [upsells, setUpsells] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    includedItems.forEach(item => {
      initial[item.id] = true;
    });
    return initial;
  });
  const [viewerCount, setViewerCount] = useState(() => Math.floor(Math.random() * 11) + 10);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      direccion: "",
      complemento: "",
      departamento: "",
      ciudad: "",
      telefono: "",
      email: "",
      nota: "",
    },
  });

  useEffect(() => {
    const getIp = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-client-ip');
        if (error) throw error;
        setClientIp(data.ip);
      } catch (error) {
        console.error('Error getting IP:', error);
      }
    };
    getIp();
  }, []);

  const [hasTrackedInitiateCheckout, setHasTrackedInitiateCheckout] = useState(false);

  const handleFormInteraction = () => {
    if (!hasTrackedInitiateCheckout) {
      trackTikTokConversion('InitiateCheckout', {
        contents: [{ content_id: productId, content_type: 'product', content_name: productName || productId, quantity: 1, price: productPrice }],
        value: productPrice,
        currency: 'COP',
        content_category: 'Conjuntos Deportivos',
      }, tiktokPixelId);
      trackFacebookConversion('InitiateCheckout', {
        content_ids: [productId],
        content_type: 'product',
        value: productPrice,
        currency: 'COP'
      }, facebookPixelId);
      setHasTrackedInitiateCheckout(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(Math.floor(Math.random() * 11) + 10);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // === Abandoned Cart Tracking ===
  const orderSubmittedRef = useRef(false);
  const submitLockRef = useRef(false);
  const lastSavedAbandonedPhoneRef = useRef<string | null>(null);

  const saveAbandonedCart = useCallback(async ({ keepalive = false }: { keepalive?: boolean } = {}) => {
    if (orderSubmittedRef.current || phoneBlocked) return;
    const telefono = normalizePhone(form.getValues('telefono') || '');
    if (!telefono || !/^[0-9]{4,15}$/.test(telefono)) return;
    if (lastSavedAbandonedPhoneRef.current === telefono) return;

    const nombres = form.getValues('nombres') || '';
    const page_url = window.location.pathname;
    const body = { nombres, telefono, page_url, product_id: productId };
    const payload = JSON.stringify(body);
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-abandoned-cart`;
    const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    lastSavedAbandonedPhoneRef.current = telefono;

    try {
      const response = await fetch(url, {
        method: 'POST',
        keepalive,
        headers: {
          'Content-Type': 'application/json',
          apikey: publishableKey,
          Authorization: `Bearer ${publishableKey}`,
        },
        body: payload,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }
    } catch (error) {
      lastSavedAbandonedPhoneRef.current = null;
      console.error('Error saving abandoned cart:', error);
    }
  }, [phoneBlocked, productId, form]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') void saveAbandonedCart({ keepalive: true });
    };
    const handleBeforeUnload = () => void saveAbandonedCart({ keepalive: true });
    const handlePageHide = () => void saveAbandonedCart({ keepalive: true });

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
    };
  }, [saveAbandonedCart]);

  const watchedPhone = form.watch('telefono');
  const selectedDepartamento = form.watch("departamento");
  const availableCiudades = selectedDepartamento ? CIUDADES_POR_DEPARTAMENTO[selectedDepartamento] || [] : [];

  useEffect(() => {
    const telefono = normalizePhone(watchedPhone || '');
    if (orderSubmittedRef.current || phoneBlocked || !/^[0-9]{4,15}$/.test(telefono)) return;
    const timeoutId = window.setTimeout(() => void saveAbandonedCart(), 600);
    return () => window.clearTimeout(timeoutId);
  }, [watchedPhone, phoneBlocked, saveAbandonedCart]);

  const onSubmit = async (data: FormValues) => {
    const normalizedPhone = normalizePhone(data.telefono);
    let resolvedClientIp = clientIp;

    if (submitLockRef.current || isSubmitting) return;
    if (phoneBlocked) {
      toast.error("Ya realizaste una compra anteriormente", {
        description: "Solo se permite una compra por persona.",
      });
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    orderSubmittedRef.current = true;

    try {
      const { data: ipCheck } = await supabase.functions.invoke('get-client-ip', {
        body: { phone: normalizedPhone },
      });
      if (ipCheck?.isPhoneBlocked) {
        setPhoneBlocked(true);
        toast.error("Ya realizaste una compra anteriormente", {
          description: "Solo se permite una compra por persona.",
        });
        setIsSubmitting(false);
        submitLockRef.current = false;
        orderSubmittedRef.current = false;
        return;
      }
      if (ipCheck?.ip) {
        resolvedClientIp = ipCheck.ip;
        setClientIp(ipCheck.ip);
      }
    } catch (e) {
      console.error('Error re-checking IP (continuing with purchase):', e);
    }

    const purchaseEventId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      await identifyTikTokUser({ email: data.email || undefined, phone: normalizedPhone, externalId: normalizedPhone });
    } catch (e) { console.error('TikTok identify failed:', e); }

    try {
      await trackTikTokPurchase({
        productId, productName: productName || productId, value: productPrice, currency: 'COP',
        email: data.email || undefined, phone: normalizedPhone, externalId: normalizedPhone,
        ip: resolvedClientIp || undefined, pixelId: tiktokPixelId, eventId: purchaseEventId,
      });
    } catch (e) { console.error('TikTok CompletePayment failed:', e); }

    try {
      trackFacebookConversion('Purchase', {
        content_ids: [productId], content_type: 'product', content_name: productName || productId,
        value: productPrice, currency: 'COP', num_items: 1
      }, facebookPixelId);
    } catch (e) { console.error('Facebook Purchase failed:', e); }

    try { trackFacebookConversion('Lead', { content_name: productName || productId, value: productPrice, currency: 'COP' }, facebookPixelId); } catch (e) {}

    if (tiktokPixelId) {
      try {
        await supabase.functions.invoke('tiktok-events-api', {
          body: {
            pixel_id: tiktokPixelId, event: 'CompletePayment', event_id: purchaseEventId,
            timestamp: Math.floor(Date.now() / 1000), user_agent: navigator.userAgent,
            ip: resolvedClientIp || undefined, page_url: window.location.href, page_referrer: document.referrer || '',
            email: data.email || undefined, phone: normalizedPhone, external_id: normalizedPhone,
            ttclid: new URLSearchParams(window.location.search).get('ttclid') || '',
            ttp: document.cookie.match(/(?:^| )_ttp=([^;]+)/)?.[1] || '',
            content_id: productId, content_name: productName || productId, content_type: 'product',
            value: productPrice, currency: 'COP', quantity: 1,
          },
        });
      } catch (e) { console.error('TikTok Server-Side failed:', e); }
    }

    try {
      const { error } = await supabase.from('orders').insert({
        nombres: data.nombres,
        apellidos: data.apellidos,
        direccion_y_barrio: data.complemento ? `${data.direccion}, ${data.complemento}` : data.direccion,
        departamento: data.departamento,
        ciudad: data.ciudad,
        telefono: normalizedPhone,
        email: data.email || null,
        colonia: null,
        nota: data.nota || defaultNota || null,
        id_producto: productId,
        id_variable: idVariable || null,
        cantidad: 1,
        precio_total: productPrice.toString(),
        con_recaudo: 'SI',
        ip_address: resolvedClientIp,
      });

      if (error) throw error;

      try {
        await supabase.from('blocked_phones').insert({ telefono: normalizedPhone });
      } catch (e) { console.error('Error saving blocked phone:', e); }
      try {
        await supabase.functions.invoke('send-telegram-notification', {
          body: { precio_total: `$${productPrice.toLocaleString('es-CO')} COP` }
        });
      } catch (telegramError) {
        console.error('Error sending Telegram notification:', telegramError);
      }
      try {
        await supabase.from('abandoned_carts').delete().eq('telefono', normalizedPhone);
      } catch (e) {}

      form.reset();
      setShowSuccessDialog(true);
    } catch (error: any) {
      orderSubmittedRef.current = false;
      console.error("Error al registrar pedido:", error);
      toast.error("Error al registrar pedido: " + (error.message || "Intenta nuevamente"));
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (phoneBlocked && !showSuccessDialog) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center gap-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500" />
          <h3 className="text-xl font-bold text-amber-600">Ya realizaste una compra</h3>
          <p className="text-muted-foreground">Solo se permite una compra por persona. Si tienes alguna duda, contáctanos por WhatsApp.</p>
        </div>
      </div>
    );
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    onOrderComplete?.();
  };

  const formatPrice = (price: number) => `$${price.toLocaleString('es-CO')}`;

  return (
    <div className="space-y-4 sm:space-y-6 w-full max-w-full overflow-x-hidden">
      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={handleCloseSuccessDialog}>
        <DialogContent className="w-[calc(100vw-16px)] max-w-lg max-h-[95dvh] overflow-x-hidden overflow-y-auto p-4 sm:p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 sm:w-16 sm:h-16 text-white" />
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-3 sm:space-y-4 py-2 max-w-full overflow-x-hidden">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground flex items-center justify-center gap-1 sm:gap-2">
              <span>🎉</span><span>¡Tu compra se ha realizado con éxito!</span><span>🎉</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Tu pedido llegará a tu domicilio en un plazo de 3 a 5 días hábiles
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4 animate-pulse">
              <p className="text-green-700 font-semibold flex items-center justify-center gap-2 text-base sm:text-lg">
                <span className="text-green-600">✅</span>
                Contamos con 2 años de garantía
              </p>
            </div>
            <div className="pt-2">
              <p className="text-muted-foreground mb-2 sm:mb-3 text-sm sm:text-base">Para cualquier duda llama al WhatsApp</p>
              <a
                href="https://wa.me/573001234567?text=Hola,%20acabo%20de%20realizar%20una%20compra%20y%20tengo%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-8 rounded-full transition-colors text-base sm:text-lg animate-pulse text-center"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="break-words">WhatsApp Colombia</span>
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 pt-3 sm:pt-4 border-t">
              <div className="flex flex-col items-center p-1.5 sm:p-2 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center break-words">Producto Original</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-100 flex items-center justify-center mb-1">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center break-words">Envío Gratis</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center break-words">2 Años Garantía</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center mb-1">
                  <LockKeyhole className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-center break-words">Pago Seguro</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 sm:p-4 mt-2">
              <p className="font-semibold text-foreground text-sm sm:text-base">¡Gracias por confiar en nosotros!</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Viewers */}
      <div className="flex max-w-full items-center justify-center gap-2 py-2 px-4 bg-destructive/10 rounded-lg border border-destructive/20 overflow-x-hidden">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
        <span className="text-sm font-medium text-destructive text-center break-words">
          {viewerCount} personas están viendo este producto
        </span>
      </div>

      {/* Order Summary */}
      <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 w-full max-w-full overflow-x-hidden">
        <div className="mb-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {productImage && !sizeDetails && (
              <img src={productImage} alt={productName} className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg bg-white shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-base sm:text-lg text-foreground break-words">{productDisplayName || productName}</h3>
              <div className="flex flex-wrap items-baseline gap-2 mt-1">
                <span className="text-sm font-semibold text-muted-foreground">Total a pagar:</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-destructive">
                  {formatPrice(productPrice)}
                </span>
              </div>
            </div>
          </div>
          {sizeDetails && sizeDetails.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
              {sizeDetails.map((detail, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-background border border-border min-w-0">
                  <img src={detail.image} alt={detail.name} className="w-10 h-10 rounded-md object-cover shrink-0" />
                  <div className="text-xs min-w-0">
                    <span className="font-bold text-foreground block break-words">{detail.name}</span>
                    <span className="text-muted-foreground break-words">{detail.topLabel || 'Camiseta'}: {detail.topSize}</span>
                    <br />
                    <span className="text-muted-foreground break-words">{detail.bottomLabel || 'Pantalón'}: {detail.bottomSize}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Included Items */}
        <div className="space-y-2 pt-4 border-t border-border">
          <p className="text-xs sm:text-sm font-semibold text-foreground">Incluye GRATIS:</p>
          {includedItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2 py-1.5 px-2 rounded-lg bg-success/10 border border-success/20 min-w-0">
              <Checkbox
                id={item.id}
                checked={upsells[item.id]}
                onCheckedChange={(checked) => setUpsells(prev => ({ ...prev, [item.id]: !!checked }))}
                className="border-success data-[state=checked]:bg-success shrink-0"
              />
              <label htmlFor={item.id} className="flex-1 cursor-pointer min-w-0">
                <span className="text-sm font-medium flex items-center gap-1.5 min-w-0">
                  <span className="shrink-0">{item.icon}</span>
                  <span className="break-words">{item.title}</span>
                </span>
                <p className="text-xs text-muted-foreground break-words">{item.description}</p>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={handleFormInteraction} className="space-y-3 sm:space-y-4 w-full max-w-full overflow-x-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="nombres"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Nombres *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} className="w-full text-base" />
                  </FormControl>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellidos"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Apellidos *</FormLabel>
                  <FormControl>
                    <Input placeholder="Tus apellidos" {...field} className="w-full text-base" />
                  </FormControl>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
          </div>

          {/* Departamento & Ciudad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="departamento"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Departamento *</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("ciudad", "");
                  }} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full text-base bg-background min-w-0">
                        <SelectValue placeholder="Selecciona departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {DEPARTAMENTOS.map((dep) => (
                        <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ciudad"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Ciudad *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedDepartamento}>
                    <FormControl>
                      <SelectTrigger className="w-full text-base bg-background min-w-0">
                        <SelectValue placeholder="Selecciona ciudad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {availableCiudades.map((ciudad) => (
                        <SelectItem key={ciudad} value={ciudad}>{ciudad}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="direccion"
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel className="text-xs sm:text-sm">Dirección completa *</FormLabel>
                <FormControl>
                  <Input placeholder="Calle, número, barrio" {...field} className="w-full text-base" />
                </FormControl>
                <FormMessage className="text-xs break-words" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complemento"
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel className="text-xs sm:text-sm">Complemento (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Apto, torre, conjunto, etc." {...field} className="w-full text-base" />
                </FormControl>
                <FormMessage className="text-xs break-words" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Teléfono / Celular *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="3001234567"
                      {...field}
                      onChange={(e) => field.onChange(normalizePhone(e.target.value))}
                      className="w-full text-base"
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="min-w-0">
                  <FormLabel className="text-xs sm:text-sm">Correo electrónico (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} className="w-full text-base" type="email" />
                  </FormControl>
                  <FormMessage className="text-xs break-words" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="nota"
            render={({ field }) => (
              <FormItem className="min-w-0">
                <FormLabel className="text-xs sm:text-sm">Nota adicional (opcional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="¿Alguna indicación especial para la entrega?" {...field} className="w-full text-base min-h-[60px]" />
                </FormControl>
                <FormMessage className="text-xs break-words" />
              </FormItem>
            )}
          />

          {/* Trust Seals */}
          <div className="flex justify-center py-2">
            <img src={selosConfianza} alt="Sellos de confianza" className="h-10 sm:h-14 object-contain" />
          </div>

          {/* Guarantee badge */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
            <img src={guaranteeBadge} alt="Garantía" className="w-12 h-12 sm:w-14 sm:h-14 object-contain shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-foreground">Garantía de Satisfacción</p>
              <p className="text-xs text-muted-foreground">Si no quedas satisfecho, te devolvemos tu dinero. Sin preguntas.</p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 sm:py-6 text-base sm:text-lg font-bold bg-[#E31837] hover:bg-[#C41430] text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Package className="w-5 h-5 mr-2" />
                CONFIRMAR PEDIDO - Pago Contra Entrega
              </>
            )}
          </Button>

          <p className="text-[10px] sm:text-xs text-center text-muted-foreground">
            🔒 Tus datos están protegidos. Pagas al recibir tu producto.
          </p>
        </form>
      </Form>
    </div>
  );
}
