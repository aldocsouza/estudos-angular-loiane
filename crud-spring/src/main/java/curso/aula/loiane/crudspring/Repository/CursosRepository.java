package curso.aula.loiane.crudspring.Repository;

import curso.aula.loiane.crudspring.Models.Cursos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CursosRepository extends JpaRepository<Cursos, Long> {
    List<Cursos> findAllByStatus(String status);
}
