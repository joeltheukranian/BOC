package com.boc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

//IndexController: Mapping urls/resources to templates/html pages
@Controller
public class IndexController {

    private final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @GetMapping("/")
    public String index() {
        return "ajax";
    }

    @GetMapping("/details")
    public String details() {
        return "details";
    }
}