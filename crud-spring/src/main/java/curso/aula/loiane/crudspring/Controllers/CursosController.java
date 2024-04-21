package curso.aula.loiane.crudspring.Controllers;

import curso.aula.loiane.crudspring.Models.Cursos;
import curso.aula.loiane.crudspring.Repository.CursosRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cursos")
@AllArgsConstructor
@CrossOrigin("*")
public class CursosController {

    private CursosRepository cursosRepository;

    @GetMapping
    public List<Cursos> getCursos() {
        return cursosRepository.findAll();
    }

    /*@GetMapping("{id}")
    public ResponseEntity<Optional<Cursos>> getCursoById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK).body(cursosRepository.findById(id));
    }*/

    @GetMapping("/{id}")
    public ResponseEntity<Cursos> getCursoById(@PathVariable Long id){
        return cursosRepository.findById(id)
                .map(registro -> ResponseEntity.ok().body(registro))
                .orElse(ResponseEntity.notFound().build());
    }

    ///COM DTO
    /*@PostMapping
    public ResponseEntity<Cursos> criarCurso(@RequestBody CursoDTO curso){
        Cursos novoCurso = new Cursos();
        novoCurso.setName(curso.name());
        novoCurso.setCategory(curso.category());

        return ResponseEntity.status(HttpStatus.CREATED).body(cursosRepository.save(novoCurso));
    }*/


    //COM ENTIDADE
    @PostMapping
    public ResponseEntity<Cursos> criarCurso(@RequestBody Cursos curso){
        return ResponseEntity.status(HttpStatus.CREATED).body(cursosRepository.save(curso));
    }


    @PutMapping("/update")
    public ResponseEntity<Cursos> updateCurso(@RequestBody Cursos curso){
        Optional<Cursos> updateCurso = cursosRepository.findById(curso.getId());

        if(updateCurso.isPresent()){
            var cursoUpdate = updateCurso.get();
            cursoUpdate.setName(curso.getName());
            cursoUpdate.setCategory(curso.getCategory());

            return ResponseEntity.status(HttpStatus.OK).body(cursosRepository.save(cursoUpdate));
        }
        return ResponseEntity.ok().build();
    }

    //LOIANE
    @PutMapping("/{id}")
    public ResponseEntity<Cursos> updateCurso2(@PathVariable Long id, @RequestBody Cursos curso){
        return cursosRepository.findById(id)
                    .map(recordFound -> {
                        recordFound.setName(curso.getName());
                        recordFound.setCategory(curso.getCategory());
                        var update = cursosRepository.save(recordFound);
                        return ResponseEntity.ok().body(update);
                    })
                    .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Cursos> removeCurso(@PathVariable Long id){
        cursosRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    ///LOIANE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        return cursosRepository.findById(id)
                .map(recordFound -> {
                    cursosRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
