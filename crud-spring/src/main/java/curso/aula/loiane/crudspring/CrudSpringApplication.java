package curso.aula.loiane.crudspring;

import curso.aula.loiane.crudspring.Enums.Category;
import curso.aula.loiane.crudspring.Models.Cursos;
import curso.aula.loiane.crudspring.Models.Lesson;
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
			c.setCategory(Category.FRONTEND);

			Lesson l = new Lesson();
			l.setName("Introdução");
			l.setYoutubeUrl("/watch?=v1");
			l.setCursos(c);
			c.getLessons().add(l);

			Lesson l1 = new Lesson();
			l1.setName("Introdução ao Angular");
			l1.setYoutubeUrl("/watch?=v2");
			l1.setCursos(c);
			c.getLessons().add(l1);

			cursosRepository.save(c);
		};
	}

}
