package com.pawan.ecom_proj.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pawan.ecom_proj.model.Product;
import com.pawan.ecom_proj.repo.ProductRepo;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public List<Product> getAllProducts() {

        return repo.findAll();

    }

    public Product getProductById(int id) {
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());
        return repo.save(product);
    }

    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
        product.setImageData(imageFile.getBytes());
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        return repo.save(product);
    }

    public void deleteProduct(int id) {
        repo.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
    public List<Product> getRecommendedProducts(int productId) {

        Product main = repo.findById(productId).orElse(null);
        if (main == null) return List.of();

        List<Product> all = repo.findAll();

        // AI similarity score for each product
        Map<Product, Integer> scoreMap = new HashMap<>();

        for (Product p : all) {
            if (p.getId() == productId) continue;

            int score = calculateSimilarity(main, p);
            scoreMap.put(p, score);
        }

        // Sort by highest score & return top 4
        return scoreMap.entrySet()
                .stream()
                .sorted((a, b) -> b.getValue() - a.getValue()) // descending 
                .limit(4)
                .map(Map.Entry::getKey)
                .toList();
    }

    private int calculateSimilarity(Product a, Product b) {

        // Combine all text features
        String t1 = (a.getName() + " " + a.getBrand() + " " + 
                     a.getDescription() + " " + a.getCategory()).toLowerCase();

        String t2 = (b.getName() + " " + b.getBrand() + " " +
                     b.getDescription() + " " + b.getCategory()).toLowerCase();

        // Split into words
        Set<String> words1 = new HashSet<>(List.of(t1.split(" ")));
        Set<String> words2 = new HashSet<>(List.of(t2.split(" ")));

        // Count matching words
        words1.retainAll(words2);

        return words1.size();  // bigger number = more similar
    }


}
