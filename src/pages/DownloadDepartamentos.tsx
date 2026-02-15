import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

const CIUDADES_POR_DEPARTAMENTO: Record<string, string[]> = {
  "ALTA VERAPAZ": ["Cobán", "San Cristóbal Verapaz", "Tactic", "San Pedro Carchá", "San Juan Chamelco", "Chisec", "Santa María Cahabón", "Santa Cruz Verapaz", "Fray Bartolomé de las Casas", "Lanquín", "Chahal", "Santa Catalina La Tinta", "Panzós", "Senahú", "Tamahú", "Tucurú", "Raxruhá"],
  "BAJA VERAPAZ": ["Salamá", "San Miguel Chicaj", "Rabinal", "San Jerónimo", "Santa Cruz El Chol", "Granados", "Purulhá", "Cubulco"],
  "CHIMALTENANGO": ["Chimaltenango", "San Martín Jilotepeque", "San Andrés Itzapa", "Tecpán Guatemala", "Patzún", "Patzicía", "San José Poaquil", "Santa Cruz Balanyá", "San Juan Comalapa", "Santa Apolonia", "Parramos", "Zaragoza", "El Tejar", "Acatenango", "San Pedro Yepocapa", "Tecpán", "Pochuta"],
  "CHIQUIMULA": ["Chiquimula", "Jocotán", "Camotán", "San José de la Arada", "San Juan Ermita", "San Jacinto", "Ipala", "San José La Arada", "Esquipulas", "Concepción Las Minas", "Olopa", "Quetzaltepeque"],
  "EL PROGRESO": ["Guastatoya", "Morazán", "San Agustín Acasaguastlán", "San Cristóbal Acasaguastlán", "El Jícaro", "Sanarate", "San Antonio La Paz", "Sansare"],
  "ESCUINTLA": ["Escuintla", "Palín", "Masagua", "Guanagazapa", "San Vicente Pacaya", "Nueva Concepción", "Tiquisate", "La Democracia", "Santa Lucía Cotzumalguapa", "La Gomera", "Siquinalá", "Puerto San José", "Iztapa", "Sipacate"],
  "GUATEMALA": ["Santa Catarina Pinula", "San José Pinula", "San José del Golfo", "Palencia", "Chinautla", "San Pedro Ayampuc", "Mixco", "San Juan Sacatepéquez", "San Raymundo", "Chuarrancho", "Fraijanes", "Amatitlán", "Villa Nueva", "Villa Canales", "San Miguel Petapa", "Guatemala", "San Pedro Sacatepéquez Guatemala", "San Pedro Sacatepéquez"],
  "HUEHUETENANGO": ["Huehuetenango", "Aguacatán", "San Sebastián Huehuetenango", "San Rafael Petzal", "Chiantla", "Malacatancito", "Santa Cruz Barillas", "San Rafael La Independencia", "Concepción Huista", "San Juan Ixcoy", "San Mateo Ixtatán", "San Miguel Acatán", "Santa Eulalia", "San Pedro Soloma", "Todos Santos Cuchumatanes", "Colotenango", "San Gaspar Ixchil", "San Juan Atitán", "Nentón", "Jacaltenango", "San Antonio Huista", "Santa Ana Huista", "San Pedro Necta", "Santiago Chimaltenango", "Cuilco", "Tectitán", "San Ildefonso Ixtahuacán", "Unión Cantinil", "Santa Bárbara Huehuetenango", "San Sebastián Coatán", "La Libertad Huehuetenango", "La Democracia Huehuetenango", "Santa Bárbara", "Petatán"],
  "IZABAL": ["Puerto Barrios", "Morales", "Livingston", "Los Amates", "El Estor"],
  "JALAPA": ["Jalapa", "San Pedro Pinula", "Monjas", "San Luis Jilotepeque", "San Manuel Chaparrón", "San Carlos Alzatate", "Mataquescuintla"],
  "JUTIAPA": ["Jutiapa", "El Progreso", "Zapotitlán", "Yupiltepeque", "El Adelanto", "Moyuta", "Pasaco", "Agua Blanca", "Santa Catarina Mita", "Atescatempa", "Asunción Mita", "Jerez", "Quesada", "Conguaco", "Jalpatagua", "San José Acatempa", "Comapa"],
  "PETÉN": ["San José", "La Libertad", "Flores", "San Benito", "San Andrés", "San Francisco", "Santa Ana", "Las Cruces", "Melchor de Mencos", "Sayaxché", "Dolores", "Poptún", "San Luis", "El Chal"],
  "QUETZALTENANGO": ["Quetzaltenango", "Salcajá", "San Martín Sacatepéquez", "Cajolá", "Concepción Chiquirichapa", "Huitán", "San Francisco La Unión", "San Miguel Sigüilá", "Olintepeque", "San Carlos Sija", "Sibilia", "San Juan Ostuncalco", "San Mateo", "Almolonga", "Cantel", "Zunil", "Coatepeque", "Flores Costa Cuca", "La Esperanza", "Palestina de Los Altos", "El Palmar", "Génova", "Colomba", "Cabricán"],
  "QUICHÉ": ["Santa Cruz del Quiché", "Chiché", "Chinique", "Chajul", "Chichicastenango", "Patzité", "San Antonio Ilotenango", "San Pedro Jocopilas", "Cunén", "San Juan Cotzal", "Nebaj", "Sacapulas", "Ixcán", "Canillá", "San Andrés Sajcabajá", "San Bartolomé Jocotenango", "Joyabaj", "Zacualpa", "Pachalum", "Santa María Nebaj", "Chicamán", "Uspantán"],
  "RETALHULEU": ["Retalhuleu", "San Andrés Villa Seca", "San Sebastián", "San Martín Zapotitlán", "Santa Cruz Muluá", "San Felipe", "Nuevo San Carlos", "El Asintal", "Champerico"],
  "SACATEPÉQUEZ": ["Antigua Guatemala", "Jocotenango", "Pastores", "Sumpango", "Santo Domingo Xenacoj", "Santiago Sacatepéquez", "San Bartolomé Milpas Altas", "San Lucas Sacatepéquez", "Santa Lucía Milpas Altas", "Magdalena Milpas Altas", "Santa María de Jesús", "Ciudad Vieja", "San Miguel Dueñas", "San Juan Alotenango", "San Antonio Aguas Calientes", "Santa Catarina Barahona"],
  "SAN MARCOS": ["San Lorenzo", "Malacatán", "San Marcos", "San Pedro Sacatepéquez", "San Antonio Sacatepéquez", "San Cristóbal Cucho", "Río Blanco", "Comitancillo", "Tajumulco", "Tejutla", "San Rafael Pie de la Cuesta", "Nuevo Progreso", "El Tumbador", "El Rodeo", "Catarina", "San Pablo", "El Quetzal", "La Reforma", "Esquipulas Palo Gordo", "Ocós", "Pajapita", "Sipacapa", "San José Ojetenam", "Sibinal", "Tacaná", "Concepción Tutuapa", "San Miguel Ixtahuacán", "Ayutla", "La Blanca"],
  "SANTA ROSA": ["Cuilapa", "Barberena", "Santa Rosa de Lima", "Casillas", "Oratorio", "Santa Cruz Naranjo", "Pueblo Nuevo Viñas", "Nueva Santa Rosa", "Chiquimulilla", "Taxisco", "San Juan Tecuaco", "Guazacapán", "Santa María Ixhuatán", "San Rafael Las Flores"],
  "SOLOLÁ": ["Sololá", "Santa Lucía Utatlán", "San Andrés Semetabaj", "San Antonio Palopó", "San José Chacayá", "María Tecún", "Los Encuentros", "Santa Catarina Palopó", "San Juan Argueta", "San Jorge La Laguna", "Concepción", "Panajachel", "Santa Cruz La Laguna", "Santa Catarina Ixtahuacán", "San Lucas Tolimán", "Santiago Atitlán", "Nahualá", "San Juan La Laguna", "San Marcos La Laguna", "San Pablo La Laguna", "San Pedro La Laguna", "Santa Clara La Laguna", "Santa María Visitación"],
  "SUCHITEPÉQUEZ": ["Mazatenango", "Cuyotenango", "San Francisco Zapotitlán", "San Bernardino", "San José El Ídolo", "Santo Domingo", "Samayac", "San Pablo Jocopilas", "San Antonio Suchitepéquez", "San Miguel Panán", "San Gabriel", "Chicacao", "Santo Tomás La Unión", "Zunilito", "Pueblo Nuevo", "San Lorenzo Suchitepéquez", "Santa Bárbara", "San Juan Bautista", "Patulul", "Río Bravo", "San José La Máquina", "San Lorenzo"],
  "TOTONICAPÁN": ["Santa Lucía La Reforma", "Totonicapán", "San Cristóbal", "San Andrés Xecul", "Santa María Chiquimula", "San Francisco El Alto", "Momostenango", "San Bartolo Aguas Calientes", "San Cristóbal Totonicapán"],
  "ZACAPA": ["Zacapa", "Teculután", "Río Hondo", "San Jorge", "Estanzuela", "Huité", "San Diego", "Usumatlán", "Cabañas", "Gualán", "La Unión"],
};

const DownloadDepartamentos = () => {
  const handleDownload = () => {
    const rows: { DEPARTAMENTO: string; CIUDAD: string }[] = [];

    Object.entries(CIUDADES_POR_DEPARTAMENTO).forEach(([depto, ciudades]) => {
      ciudades.forEach((ciudad) => {
        rows.push({ DEPARTAMENTO: depto, CIUDAD: ciudad });
      });
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Departamentos y Ciudades");

    // Auto-size columns
    ws["!cols"] = [{ wch: 25 }, { wch: 40 }];

    XLSX.writeFile(wb, "Departamentos_y_Ciudades_Guatemala.xlsx");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold text-foreground">
          Departamentos y Ciudades - Guatemala
        </h1>
        <p className="text-muted-foreground">
          Descarga la lista completa de departamentos y ciudades disponibles
        </p>
        <Button onClick={handleDownload} size="lg" className="gap-2">
          <Download className="w-5 h-5" />
          Descargar Excel
        </Button>
      </div>
    </div>
  );
};

export default DownloadDepartamentos;
