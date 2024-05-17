package curso.aula.loiane.crudspring.Controllers;

import curso.aula.loiane.crudspring.Models.DTOs.CursoDTO;
import curso.aula.loiane.crudspring.Repository.CursosRepository;
import curso.aula.loiane.crudspring.Services.CursosService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/cursos")
@CrossOrigin("*")
public class CursosController {

    public CursosController(CursosRepository cursosRepository, CursosService cursosService) {
        this.cursosRepository = cursosRepository;
        this.cursosService = cursosService;
    }

    private CursosRepository cursosRepository;
    private CursosService cursosService;

    @GetMapping
    public List<CursoDTO> getCursos() {
        return cursosService.getCursos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CursoDTO> getCursoById(@PathVariable @NotNull @Positive Long id){
        return ResponseEntity.ok().body(cursosService.getCursoById(id));
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
    @ResponseStatus(HttpStatus.CREATED)
    public CursoDTO criarCurso(@RequestBody @Valid CursoDTO curso){
        return cursosService.criarCurso(curso);
    }

    @PutMapping("/update")
    public ResponseEntity<CursoDTO> updateCurso(@RequestBody @Valid CursoDTO curso){
        return ResponseEntity.status(HttpStatus.OK).body(cursosService.updateCurso(curso));
    }

    @DeleteMapping("/{id}")
    public void removeCurso(@PathVariable @NotNull @Positive Long id){
        cursosService.removeCurso(id);
    }

    ///LOIANE
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable @NotNull @Positive Long id){
        return cursosRepository.findById(id)
                .map(recordFound -> {
                    cursosRepository.deleteById(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
