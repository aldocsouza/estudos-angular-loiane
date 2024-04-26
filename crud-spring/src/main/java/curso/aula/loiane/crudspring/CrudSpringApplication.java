package curso.aula.loiane.crudspring;

import curso.aula.loiane.crudspring.Models.Cursos;
import curso.aula.loiane.crudspring.Repository.CursosRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CursosRepository cursosRepository){
		return args -> {
			cursosRepository.deleteAll();

			Cursos c = new Cursos();
			c.setName("Angular com Spring");
			c.setCategory("Front-end");

			cursosRepository.save(c);
		};
	}

}
