package sk.tuke.ais.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sk.tuke.ais.domain.DocumentRequest;
import sk.tuke.ais.repo.DocumentRequestRepository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/document-requests")
public class DocumentRequestController {
  private final DocumentRequestRepository docs;
  public DocumentRequestController(DocumentRequestRepository d){ this.docs=d; }

  record CreateReq(@NotNull UUID studentId, @NotBlank String type){}

  @GetMapping("/me")
  @PreAuthorize("hasRole('STUDENT')")
  public List<DocumentRequest> my(@RequestParam UUID studentId){ return docs.findByStudentId(studentId); }

  @PostMapping
  @PreAuthorize("hasRole('STUDENT')")
  public DocumentRequest create(@RequestBody CreateReq req){
    var dr = new DocumentRequest();
    dr.setId(UUID.randomUUID());
    dr.setStudentId(req.studentId());
    dr.setType(req.type());
    dr.setState("NEW");
    dr.setCreatedAt(OffsetDateTime.now());
    dr.setUpdatedAt(OffsetDateTime.now());
    return docs.save(dr);
  }

  @PostMapping("/{id}/advance")
  @PreAuthorize("hasRole('ADMIN')")
  public DocumentRequest advance(@PathVariable UUID id, @RequestParam String state){
    var dr = docs.findById(id).orElseThrow();
    dr.setState(state);
    dr.setUpdatedAt(OffsetDateTime.now());
    return docs.save(dr);
  }
}
